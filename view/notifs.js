"use strict"

Session.prototype.request_notifs = async function(offset, count) {
	let data = await SESS.request_data(`notifications/list?offset=${offset}&limit=${count}`)
	console.log(data)
	Comment.revive_map(data.comments)
	Project.revive_map(data.projects)
	Post.revive_map(data.posts)
	return data.notifications.map(n=>Notif.Create(n, data))
}

class NotifView extends View {
	static path = ['rc','project','notifications']
	async request() {
		// todo: dont rely on global SESS
		let data = await SESS.request_notifs(0, 30)
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
