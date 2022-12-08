"use strict"

class LoginView extends View {
	static path = ['rc', 'login']
	title() {
		return "Log In"
	}
	render() {
		let x = Draw.elem('form')
		x.method='dialog'
		
		let e = Draw.elem('input')
		e.type='email'
		e.name='email'
		e.placeholder="Email"
		
		let b = Draw.elem('button')
		b.append('log in')
		
		let p = Draw.elem('input')
		p.type='password'
		p.name='password'
		p.placeholder="Password"
		p.autocomplete='current-password'
		
		let s = Draw.elem('label')
		s.title="Show Password"
		
		let c = Draw.elem('input')
		c.type='checkbox'
		c.autocomplete='off'
		c.onchange = ev=>{
			p.type = c.checked ? 'text' : 'password'
		}
		
		s.append('👁️', c)
		
		let pw = Draw.elem('div', {class:'row align'})
		pw.append(p, s)
		
		x.append(e, pw, b)
		
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
