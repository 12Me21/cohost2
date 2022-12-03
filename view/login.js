"use strict"

class LoginView extends View {
	static path = ['rc', 'login']
	title() {
		return "Log In"
	}
	render() {
		let x = document.createElement('form')
		x.method='dialog'
		
		let e = document.createElement('input')
		e.type='email'
		e.name='email'
		e.placeholder="Email"
		
		let b = document.createElement('button')
		b.append('log in')
		
		let p = document.createElement('input')
		p.type='password'
		p.name='password'
		p.placeholder="Password"
		p.autocomplete='current-password'
		
		let s = document.createElement('label')
		s.title="Show Password"
		
		let c = document.createElement('input')
		c.type='checkbox'
		c.autocomplete='off'
		c.onchange = ev=>{
			p.type = c.checked ? 'text' : 'password'
		}
		
		s.append('👁️', c)
		
		x.append(e, p, s, b)
		
		x.onsubmit = async (ev)=>{
			ev.preventDefault()
			try {
				await SESS.request_cookie(e.value, p.value)
			} catch(e) {
				alert('login failed')
				throw e
			}
			window.location.hash = "#" // hack
			RELOAD()
		}
		
		this.$root.append(x)
	}
}

NAV.register(LoginView)
