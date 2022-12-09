"use strict"

// output: {project, posts, pagination}
Session.prototype.request_project = async function(handle) {
	let data = await this.request_page(handle)
	console.log(data)
	let ppv = data.__COHOST_LOADER_STATE__['project-page-view']
	let perm = ppv.canAccessPermissions
	let project = new Project(ppv.project)
	
	let qs = data['trpc-dehydrated-state'].queries
	let pd = qs.find(({queryKey:[k,p]})=>k[0]=='posts' && k[1]=='profilePosts' && Project.compare_handles(p.projectHandle, handle))
	pd = pd.state.data
	
	let fs = qs.find(({queryKey:[k,p]})=>k[0]=='projects' && k[1]=='followingState' && Project.compare_handles(p.projectHandle, handle))
	fs = fs.state.data
	
	Post.revive_list(pd.posts)
	pd.project = project
	pd.following = fs
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
		// profile
		let p = this.data.project
		let e = Draw.elem('div', {
			class: 'profile-header col'
		})
		
		let e2 = Draw.elem('div', {
			class: 'col fill'
		})
		
		let e1 = Draw.elem('div', {
			class: 'row',
			2: e,
			8: [p.render_avatar(), e2],
		})
		
		Draw.elem('div', {
			class: 'profile-display-name',
			2: e2,
			8: [pre(p.name)],
		})
		
		if (p.dek) {
			Draw.elem('div', {
				class: 'profile-headline',
				8: [pre(p.dek)],
				2: e2,
			})
		}
		
		let e3 = Draw.elem('div', {
			class: 'row align',
			2: e2,
		})
		
		if (p.pronouns) {
			Draw.elem('div', {
				class:'profile-pronouns align row',
				2: e3,
				8: [
					icon('profile-pronouns', true),
					pre(p.pronouns),
				],
			})
		}
		
		let fs = this.data.following
		Draw.elem('div', {
			class: 'row align',
			style: 'margin-left: auto;',
			2: e3,
			8: [
				Draw.elem('button', {
					8: [fs.readerToProject ? 'following' : 'follow']
				}),
				Draw.elem('span', {
					8: [fs.projectToReader ? 'follows you' : '']
				}),
			],
		})
		
		
		if (p.url) {
			Draw.elem('a', {
				class: 'profile-link align row',
				href: p.url,
				2: e2,
				8: [
					icon('profile-link', true),
					pre(p.url),
				],
			})
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
