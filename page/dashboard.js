"use strict"

Session.prototype.request_dashboard = async function(refTimestamp, skipPosts) {
	let data = await this.request_page('', {refTimestamp, skipPosts})
	let db = data.__COHOST_LOADER_STATE__.dashboard
	new Project(db.project)
	Post.revive_list(db.posts)
	//Project.revive_list(db.staffProjects)
	return db
}

class DashboardView extends View {
	static path = []
	title() {
		return "Home"
	}
	async request() {
		// todo: dont rely on global SESS.
		// just specify which request function to call, instead.
		this.data = await SESS.request_dashboard()
	}
	render() {
		this.$root.className += ' scroller'
		let n = document.createElement('div')
		this.$root.append(n)
		for (let post of this.data.posts)
			n.append(post.render())
	}
}

NAV.register(DashboardView)
