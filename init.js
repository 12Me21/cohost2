"use strict"

SESS.load_cookie()

window.addEventListener('DOMContentLoaded', ev=>{
	
	window.print = (m)=>{
		let x = document.createElement('div')
		x.append(m)
		$printer.prepend(x)
	}
	for (let x of messages) {
		print(x)
	}
	messages = null
	
	log='hello'
	log('uwu')
	log`owo`
	
	{
		let a = NAV.render_link('')
		a.append(icon('home'), "home")
		a.className = 'row'
		let b = NAV.render_link('rc/project/notifications')
		b.append(icon('notifications'), "notifications")
		b.className = 'row'
		$sidebar.append(a, b)
	}
	
	NAV.onload()
})
