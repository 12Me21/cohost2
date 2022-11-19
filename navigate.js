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
		if (!(cls instanceof View))
			cls = UnknownView
		this.load_view(cls)
	}
	
	onload() {
		window.onhashchange = ev=>{
			this.update_from_location(window.location.hash.substring(1))
		}
		this.update_from_location(window.location.hash.substring(1))
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
