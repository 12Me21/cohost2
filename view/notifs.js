class NotifView extends View {
	static match(hash) {
		return hash=='rc/project/notifications'
	}
	async request() {
		// todo: dont rely on global SESS?
		let data = await SESS.request_data('notifications/list')
		this.data = data
	}
	title() {
		return "Notifications"
	}
	render() {
		let {comments, posts, projects, notifications:notifs} = this.data
		for (let notif of notifs) {
			let x = document.createElement('div')
			x.append(JSON.stringify(notif))
			this.$root.append(x)
		}
	}
}

NAV.register(NotifView)
