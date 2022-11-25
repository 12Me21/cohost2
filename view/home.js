class HomeView extends View {
	static match(hash) {
		return hash==''
	}
	title() {
		return "Home"
	}
	render() {
		let a = document.createElement('a')
		a.href = "#"
		a.append(icon('home'), "home")
		
		let b = document.createElement('a')
		b.href = "#rc/project/notifications"
		b.append(icon('notifications'), "notifications")
		this.$root.append(a, b)
	}
}

NAV.register(HomeView)
