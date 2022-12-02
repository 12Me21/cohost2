SESS.load_cookie()

window.addEventListener('DOMContentLoaded', ev=>{
	
	window.print = (m)=>{
		let x = document.createElement('div')
		x.append(m)
		$sidebar.prepend(x)
	}
	for (let x of messages) {
		print(x)
	}
	messages = null
	
	log='hello'
	log('uwu')
	log`owo`
	
	NAV.onload()
})
