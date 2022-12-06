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
		// profile
		let p = this.data.project
		let e = elem('div', 'profile-header')
		e.append(p.render_avatar())
		if (p.displayName) {
			let dn = elem('div', 'profile-display-name')
			dn.append(pre(p.displayName))
			e.append(dn)
		}
		e.append(p.render_handle())
		if (p.dek) {
			let de = elem('div', 'profile-headline')
			de.append(pre(p.dek))
			e.append(de)
		}
		if (p.pronouns) {
			let pr = elem('div', 'profile-pronouns')
			pr.append(icon('profile-pronouns', true), pre(p.pronouns))
			e.append(pr)
		}
		if (p.url) {
			let pr = elem('div', 'profile-link')
			pr.append(icon('profile-link', true), pre(p.url))
			e.append(pr)
		}
		// todo: needs parsing
		if (p.description) {
		}
		this.$root.append(e)
		
		// posts
		let n = elem('div')
		for (let post of this.data.posts)
			n.append(post.render())
		this.$root.append(n)
	}
}

NAV.register(ProjectView)
