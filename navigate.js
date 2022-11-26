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
	}
	
	async load_view(cls) {
		this.set_status('loading...')
		let view = new cls()
		await view.request()
		this.current = view
		this.set_status('drawing...')
		$title.replaceChildren(view.title())
		view.render()
		$main.replaceChildren(view.$root)
		this.set_status('ok')
	}
	
	update_from_location() {
		let fragment = this.read_location()
		if (!SESS.cookie)
			return
		let cls = this.views.find(cls=>cls.match(fragment))
		if (!cls)
			cls = UnknownView
		this.load_view(cls)
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
}

window.NAV = new Nav()

class UnknownView extends View {
	render() {
		this.$root.append('???')
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
	for (let [k,v] of Object.entries(map)) {
		new type(v, k)
	}
}
