"use strict"
async function get_hash(password, salt) {
	salt = atob(salt.replace(/[^A-Za-z0-9+/]/g, 'A'))
	salt = Uint8Array.from(salt, x=>x.charCodeAt()).buffer
	
	password = new TextEncoder().encode(password)
	
	// todo: is therea shorter way to do this? json web key format?
	const def = {name: 'PBKDF2', hash: 'SHA-384', iterations: 2e5, salt}
	let key
	key = await crypto.subtle.importKey(
		'raw', password, def, false, ['deriveKey']
	)
	key = await crypto.subtle.deriveKey(def, key, {
		name: 'HMAC',
		hash: 'SHA-384',
	}, true, ['sign'])
	key = await crypto.subtle.exportKey('raw', key)
	
	return btoa(String.fromCharCode(...new Uint8Array(key)))
}

async function get_salt(email) {
	let url = new URL('https://cohost.org/api/v1//login/salt')
	url.searchParams.set('email', email)
	let resp = await fetch(url)
	let data = await resp.json()
	return data.salt
}

async function log_in(email, hash) {
	let url = new URL('https://cohost.org/api/v1//login')
	let body = new URLSearchParams([['email', email],['clientHash', hash]])
	let resp = await fetch(url, {method:'POST',body,mode:'cors',headers:{'x-idk':'3'}})
	let cookie = /connect.sid=(.*?);/.exec(resp.headers.get('content-language'))?.[1]
	let data = await resp.json()
	return [data, cookie]
}

async function go(email, password) {
	let salt = await get_salt(email)
	let hash = await get_hash(password, salt)
	let data = await log_in(email, hash)
	return data
}

async function api_request(endpoint, cookie, data) {
	let config = {
		headers: {x_12_cookie: 'connect.sid='+cookie},
	}
	if (data!==undefined) {
		config.method = 'POST'
		config.body = new Blob([JSON.stringify(data)], {type: "application/json;charset=UTF-8"})
	}
	let resp = await fetch(`https://cohost.org/api/v1//${endpoint}`, config)
	return await resp.json()
}

async function api_get(things) {
	let qs = []
	let params = {}
	for (let [thing, args] of things) {
		let n = qs.length
		qs[n] = thing
		if (args!==undefined)
			params[n] = args
	}
	let url = 'trpc/'+qs.join()+"?batch=1&input="+encodeURIComponent(JSON.stringify(params))
	let data = await api_request(url, localStorage.sid)
	return data.map(x=>x.result?.data ?? x)
}

api_get([
	['posts.profilePosts', {
		projectHandle:"-12",page:0,options:{hideReplies:false,hideShares:false}
	}],
])
