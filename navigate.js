"use strict"

// base class
class View {
	$root = document.createElement('view-root')
	async request() {}
	render() {}
}

class Nav {
	current = null
	views = []
	
	constructor() {
	}
	
	register(cls) {
		this.views.push(cls)
		let regex = cls.path.map(x=>x===true ? "([^/]*)" : x).join("[/]")
		// bad
		cls.path_regex = new RegExp("^"+regex+"$")
	}
	
	async load_view(cls, location) {
		let ok = false
		try {
			this.set_status('loading...')
			let view = new cls()
			view.location = location
			await view.request()
			this.current = view
			
			this.set_status('rendering...')
			await {then:y=>window.setTimeout(y)}
			$title.replaceChildren(view.title())
			gallery_show(null)
			view.render()
			
			this.set_status('layout...')
			await {then:y=>window.setTimeout(y)}
			$main.replaceChildren(view.$root)
			
			this.set_status('ok')
			ok = true
		} finally {
			if (!ok) {
				this.set_status('error')
				$main.replaceChildren()
				$title.replaceChildren('error')
			}
		}
	}
	
	update_from_location() {
		let fragment = this.read_location()
		let match
		// todo: update address bar url here ?
		if (fragment.startsWith("/"))
			fragment = fragment.slice(1)
		if (fragment.endsWith("/"))
			fragment = fragment.slice(0, -1)
		
		let cls = this.views.find(cls=>{
			match = cls.path_regex.exec(fragment)
			return match
		})
		if (!cls) {
			cls = UnknownView
			match = [fragment]
		}
		this.load_view(cls, match)
	}
	
	read_location() {
		return window.location.hash.slice(1)
	}
	
	onload() {
		window.onhashchange = ev=>{
			this.update_from_location()
		}
		this.update_from_location()
	}
	
	set_status(text) {
		$status.textContent = text
	}
	
	link(url, p) {
		if ('string'==typeof url)
			url = new URL(url, 'https://cohost.org')
		let a = document.createElement('a')
		if (url.origin=="https://cohost.org" || url.protocol=='web+cohost:')
			a.href = "#"+url.pathname+url.search+url.hash
		else
			a.href = url.href
		return BaseElem.call(a, p)
	}
	
	render_link(url) {
		if ('string'==typeof url)
			url = new URL(url, 'https://cohost.org')
		let a = document.createElement('a')
		if (url.origin=="https://cohost.org" || url.protocol=='web+cohost:')
			a.href = "#"+url.pathname+url.search+url.hash
		else
			a.href = url.href
		return a
	}
}

window.NAV = new Nav()

class UnknownView extends View {
	static path = null
	render() {
		let ch = "https://cohost.org/"+this.location[0]
		let a = Draw.elem('a')
		a.href = ch
		a.append(ch)
		this.$root.append("go to cohost: ", a)
	}
	title() {
		return "Unknown Page"
	}
}

//lets just merge navigate and session?
