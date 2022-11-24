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
		let view = new cls()
		await view.request()
		this.current = view
		$title.replaceChildren(view.title())
		view.render()
		$main.replaceChildren(view.$root)
	}
	
	update_from_location(fragment) {
		if (!SESS.cookie)
			return
		let cls = this.views.find(cls=>cls.match(fragment))
		if (!cls)
			cls = UnknownView
		this.load_view(cls)
	}
	
	onload() {
		window.onhashchange = ev=>{
			this.update_from_location(window.location.hash.slice(1))
		}
		this.update_from_location(window.location.hash.slice(1))
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
