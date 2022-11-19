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
		let cls = this.views.find(cls=>cls.match(fragment))
		if (!cls)
			return
		this.load_view(cls)
	}
}

window.NAV = new Nav()

window.onhashchange = ev=>{
	NAV.update_from_location(window.location.hash.substring(1))
}
