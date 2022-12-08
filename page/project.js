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
		await Markdown.ready
	}
	title() {
		return "@"+this.data.project.handle
	}
	render() {
		this.$root.className += ' scroller'
		// profile
		let p = this.data.project
		let e = Draw.elem('div', {class:'profile-header col'})
		
		let e1 = Draw.elem('div', {class:'row'})
		e.append(e1)
		
		let e2 = Draw.elem('div', {class:'col fill'})
		e1.append(p.render_avatar(), e2)
		
		//e2.append(p.render_handle())
		if (p.displayName) {
			let dn = Draw.elem('div', {class:'profile-display-name'})
			dn.append(pre(p.displayName))
			e2.append(dn)
		}
		
		if (p.dek) {
			let de = Draw.elem('div', {class:'profile-headline'})
			de.append(pre(p.dek))
			e2.append(de)
		}
		
		if (p.pronouns) {
			let pr = Draw.elem('div', {class:'profile-pronouns align row'})
			pr.append(icon('profile-pronouns', true), pre(p.pronouns))
			e2.append(pr)
		}
		if (p.url) {
			let pr = Draw.elem('div', {class:'profile-link align row'})
			pr.append(icon('profile-link', true), pre(p.url))
			e2.append(pr)
		}
		// todo: needs parsing
		if (p.description) {
		}
		this.$root.append(e)
		
		// posts
		let n = Draw.elem('div')
		for (let post of this.data.posts)
			n.append(post.render_chain())
		this.$root.append(n)
	}
}

NAV.register(ProjectView)
