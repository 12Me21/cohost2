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
	
	log='hi'
	//log('uwu')
	//log`owo`
	
	{
		for (let [i, t, u] of [
			['home', "home", ''],
			['notifications', "notifications", 'rc/project/notifications'],
			['like', "your likes", 'rc/likes'],
			['search', "search", 'rc/search'],
			['profile', "profile", '-12'],
			['drafts', "drafts", 'rc/posts/unpublished'],
			['following', "following", 'rc/project/following'],
			['followers', "followers", 'rc/project/followers'],
			['login', "log in", 'rc/login'],
		]) {
			let a = NAV.render_link(u)
			a.append(icon(i), t)
			a.className = 'row align'
			$sidebar.append(a)
		}
	}
	
	NAV.onload()
})
