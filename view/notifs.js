Session.prototype.request_notifs = function(offset, count) {
	let data = await SESS.request_data(`notifications/list?offset=${offset}&limit=${count}`)
	for (let n of data.notifications)
		new Notif(n, data)
	return data.notifications
}

class NotifView extends View {
	static match(hash) {
		return hash=='rc/project/notifications'
	}
	async request() {
		// todo: dont rely on global SESS
		let data = await SESS.request_notifs(0, 20)
		this.data = data
	}
	title() {
		return "Notifications"
	}
	render() {
		this.$root.className += ' col'
		for (let notif of this.data) {
			this.$root.append(notif.render())
		}
	}
}

NAV.register(NotifView)
