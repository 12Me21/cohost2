Session.prototype.request_notifs = async function(offset, count) {
	let data = await SESS.request_data(`notifications/list?offset=${offset}&limit=${count}`)
	revive_map(Comment, data.comments)
	revive_map(Project, data.projects)
	revive_map(Post, data.posts)
	return data.notifications.map(n=>Notif.Create(n, data))
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
		this.$root.className += ' scroller'
		let n = document.createElement('div')
		this.$root.append(n)
		for (let notif of this.data) {
			n.append(notif.render())
		}
	}
}

NAV.register(NotifView)
