// base class
class View {
	$root = document.createElement('view-root')
	async request() {}
	render() {}
	static match() {}
}

class Nav {
	current = null
	views = []
	
	constructor() {
	}
	
	register(cls) {
		this.views.push(cls)
		let regex = cls.path.map(x=>x===true ? "([^/]*)" : x).join("[/]")
		cls.path_regex = new RegExp("^"+regex+"$")
	}
	
	async load_view(cls, location) {
		try {
			this.set_status('loading...')
			let view = new cls()
			view.location = location
			await view.request()
			this.current = view
			this.set_status('drawing...')
			$title.replaceChildren(view.title())
			view.render()
			$main.replaceChildren(view.$root)
			this.set_status('ok')
		} catch (e) {
			this.set_status('error')
		}
	}
	
	update_from_location() {
		let fragment = this.read_location()
		if (!SESS.cookie)
			return
		let match
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
	
	render_link(location) {
		let a = document.createElement('a')
		a.href = "#"+location
		return a
	}
	
	check_path(path) {
		
	}
}

window.NAV = new Nav()

class UnknownView extends View {
	static path = null
	render() {
		let ch = "https://cohost.org/"+this.location[0]
		let a = document.createElement('a')
		a.href = ch
		a.append(ch)
		this.$root.append("go to cohost: ", a)
	}
	title() {
		return "Unknown Page"
	}
}

function icon(name) {
	let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
	let use = document.createElementNS("http://www.w3.org/2000/svg", 'use')
	use.href.baseVal = "res/icons.svg#"+name
	svg.append(use)
	svg.classList.add('icon')
	return svg
}


//lets just merge navigate and session?

function revive_map(type, map) {
	for (let [k,v] of Object.entries(map))
		new type(v, k)
}

function revive_list_map(type, map) {
	for (let [k, v] of Object.entries(map))
		for (let item of v)
			new type(item)
}
