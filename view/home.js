class HomeView extends View {
	static match(hash) {
		return hash==''
	}
	title() {
		return "Home"
	}
	render() {
		let a = NAV.render_link('')
		a.append(icon('home'), "home")
		let b = NAV.render_link('rc/project/notifications')
		b.append(icon('notifications'), "notifications")
		this.$root.append(a, b)
	}
}

NAV.register(HomeView)
