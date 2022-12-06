"use strict"

// output: {project, posts, pagination}
Session.prototype.request_project = async function(handle) {
	let data = await this.request_page(handle)
	
	let ppv = data.__COHOST_LOADER_STATE__['project-page-view']
	let perm = ppv.canAccessPermissions
	let project = new Project(ppv.project)
	
	let qs = data['trpc-dehydrated-state'].queries
	let pd = qs.find(({queryKey:[k,p]})=>k[0]=='posts' && k[1]=='profilePosts' && p.projectHandle==handle)
	pd = pd.state.data
	
	Post.revive_list(pd.posts)
	pd.project = project
	return pd
}

class ProjectView extends View {
	static path = [true]
	async request() {
		let [handle] = this.location
		let data = await SESS.request_project(handle)
		this.data = data
	}
	title() {
		return "@"+this.data.project.handle
	}
	render() {
		this.$root.className += ' scroller'
		let n = elem('div')
		this.$root.append(n)
		for (let post of this.data.posts)
			n.append(post.render())
	}
}

NAV.register(ProjectView)
