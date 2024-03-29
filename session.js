"use strict"

class Session {
	static BASE = 'https://cohost.org'
	
	static async request_salt(email) {
		let url = new URL('api/v1/login/salt', this.BASE)
		url.searchParams.set('email', email)
		let resp = await fetch(url)
		let data = await resp.json()
		return data.salt
	}
	
	static async hash_password(password, salt) {
		// we need replace "_" and "-" in the salt with "A",
		// to due to a bug in the official implementation
		salt = atob(salt.replace(/[^A-Za-z0-9+/=]/g, 'A'))
		salt = Uint8Array.from(salt, x=>x.charCodeAt()).buffer
		
		password = new TextEncoder().encode(password)
		
		const algorithm = {name: 'PBKDF2', hash: 'SHA-384', iterations: 2e5, salt}
		let key
		key = await crypto.subtle.importKey('raw', password, algorithm, false, ['deriveKey'])
		key = await crypto.subtle.deriveKey(algorithm, key, {name:'HMAC', hash:'SHA-384'}, true, ['sign'])
		key = await crypto.subtle.exportKey('raw', key)
		
		return btoa(String.fromCharCode(...new Uint8Array(key)))
	}
	
	static async request_login(email, hash) {
		const url = new URL('api/v1/login', this.BASE)
		const body = new URLSearchParams([['email', email],['clientHash', hash]])
		const resp = await fetch(url, {
			method: 'POST',
			body,
			mode: 'cors',
			headers: {'x-idk':'3'},
			//credentials: 'include',
		})
		const cookie = /connect.sid=(.*?);/.exec(resp.headers.get('content-language'))?.[1]
		const data = await resp.json()
		return {data, cookie}
	}

	async request_cookie(email, password) {
		let salt = await Session.request_salt(email)
		let hash = await Session.hash_password(password, salt)
		let {data, cookie} = await Session.request_login(email, hash)
		this.cookie = cookie
		this.save_cookie()
	}
	
	async request_logout() {
		let resp = await fetch(`${Session.BASE}/rc/logout`, {
			method: 'POST',
			headers: {x_12_cookie: 'connect.sid='+this.cookie},
			//credentials: 'include',
		})
		if (resp.ok) {
			localStorage.removeItem('sid')
			this.cookie = null
		}
		return resp
	}
	
	save_cookie() {
		localStorage.setItem('sid', this.cookie)
	}
	
	load_cookie() {
		let cookie = localStorage.getItem('sid', this.cookie)
		if (!cookie)
			return false
		this.cookie = cookie
		return true
	}

	async request_data(endpoint, data) {
		let config = {
			headers: {x_12_cookie: 'connect.sid='+this.cookie},
			//credentials: 'include',
		}
		if (data!==undefined) {
			config.method = 'POST'
			config.body = new Blob([JSON.stringify(data)], {type: "application/json;charset=UTF-8"})
		}
		console.info('🛰️ requesting', endpoint)
		let resp = await fetch(`${Session.BASE}/api/v1/${endpoint}`, config)
		console.info('got response')
		return await resp.json()
	}
	
	async request_trpc(things) {
		let qs = []
		let params = {}
		for (let [thing, args] of things) {
			let len = qs.push(thing)
			if (args!==undefined)
				params[len-1] = args
		}
		let url = 'trpc/'+qs.join(",")+"?batch=1&input="+encodeURIComponent(JSON.stringify(params))
		let data = await this.request_data(url)
		return data
	}
	
	async request_page(endpoint, params) {
		let url = new URL(endpoint, Session.BASE)
		if (params) {
			let sp = url.searchParams
			for (let [k, v] of Object.entries(params)) {
				if (v!==undefined)
					sp.append(k, v)
			}
		}
		
		console.info('🛰️ requesting', endpoint)
		let resp = await fetch(url, {
			headers: {x_12_cookie: 'connect.sid='+this.cookie},
			//credentials: 'include',
		})
		console.info('got response')
		let html = await resp.text()
		
		let data = {}
		let regex = /^<script type="application[/]json" id="([^"]*)">/gm
		let match
		while (match = regex.exec(html)) {
			let id = match[1]
			let start = regex.lastIndex
			let end = html.indexOf("</script>\n", start) // this is safe, this str cannot appear in json
			data[id] = JSON.parse(html.substring(start, end))
		}
		return data
	}
}
