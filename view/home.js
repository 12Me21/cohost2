class HomeView extends View {
	static match(hash) {
		return hash==''
	}
	title() {
		return "Home"
	}
	render() {
	}
}

NAV.register(HomeView)
