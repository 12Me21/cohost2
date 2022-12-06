"use strict"

Session.prototype.request_notifs = async function(offset, count) {
	let data = await this.request_data(`notifications/list?offset=${offset}&limit=${count}`)
	Comment.revive_map(data.comments)
	Project.revive_map(data.projects)
	Post.revive_map(data.posts)
	data.notifications = data.notifications.map(n=>Notif.Create(n, data))
	return data
}

class NotifView extends View {
	static path = ['rc','project','notifications']
	async request() {
		this.data = await SESS.request_notifs(0, 30)
	}
	title() {
		return "Notifications"
	}
	render() {
		this.$root.className += ' scroller'
		let n = elem('div')
		this.$root.append(n)
		for (let notif of this.data.notifications) {
			n.append(notif.render())
		}
	}
}

NAV.register(NotifView)
