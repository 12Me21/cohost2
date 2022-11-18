let API_URL = 'https://cohost.org/api/v1//'

class Session {
	
	static async request_salt(email) {
		let url = new URL(API_URL+'login/salt')
		url.searchParams.set('email', email)
		let resp = await fetch(url)
		let data = await resp.json()
		return data.salt
	}
	
	static async hash_password(password, salt) {
		salt = atob(salt.replace(/[^A-Za-z0-9+/]/g, 'A'))
		salt = Uint8Array.from(salt, x=>x.charCodeAt()).buffer
		
		password = new TextEncoder().encode(password)
		
		// todo: is therea shorter way to do this? json web key format?
		const algorithm = {name: 'PBKDF2', hash: 'SHA-384', iterations: 2e5, salt}
		let key
		key = await crypto.subtle.importKey('raw', password, algorithm, false, ['deriveKey'])
		key = await crypto.subtle.deriveKey(algorithm, key, {name:'HMAC', hash:'SHA-384'}, true, ['sign'])
		key = await crypto.subtle.exportKey('raw', key)
		
		return btoa(String.fromCharCode(...new Uint8Array(key)))
	}
	
	static async request_login(email, hash) {
		const url = new URL(API_URL+'login')
		const body = new URLSearchParams([['email', email],['clientHash', hash]])
		const resp = await fetch(url, {method:'POST', body, mode:'cors', headers:{'x-idk':'3'}})
		const cookie = /connect.sid=(.*?);/.exec(resp.headers.get('content-language'))?.[1]
		const data = await resp.json()
		return {data, cookie}
	}

	async request_cookie(email, password) {
		let salt = await Session.request_salt(email)
		let hash = await Session.get_hash(password, salt)
		let {data, cookie} = await Session.request_login(email, hash)
		this.cookie = cookie
		this.save_cookie()
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
		}
		if (data!==undefined) {
			config.method = 'POST'
			config.body = new Blob([JSON.stringify(data)], {type: "application/json;charset=UTF-8"})
		}
		let resp = await fetch(API_URL+endpoint, config)
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
		let url = 'trpc/'+qs.join()+"?batch=1&input="+encodeURIComponent(JSON.stringify(params))
		let data = await this.request_data(url)
		return data
	}
}

let x = new Session()
x.load_cookie()

async function test() {
	let data = await x.request_trpc([
		['posts.profilePosts', {
			projectHandle:"-12",page:0,options:{hideReplies:false,hideShares:false}
		}],
	])
	console.log(data)
}
