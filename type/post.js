"use strict"

class Post extends Entity {
	static fallback(id) {
		return {
			postId: id,
			headline: "",
			publishedAt: "2000-01-01T00:00:00Z",
			filename: String(id),
			transparentShareOfPostId: null,
			state: 1, //?
			numComments: 0,
			numSharedComments: 0,
			cws: [],
			tags: [],
			blocks: [],
			plainTextBody: "",
			postingProject: null,
			shareTree: [],
			relatedProjects: [],
			singlePostPageUrl: `https://cohost.org/null/post/${id}`,
			effectiveAdultContent: false,
			isEditor: false,
			contributorBlockIncomingOrOutgoing: false,
			hasAnyContributorMuted: false,
			postEditUrl: `https://cohost.org/null/post/${id}/edit`,
			isLiked: false,
			canShare: false,
			canPublish: false,
			hasCohostPlus: false,
			pinned: false,
			commentsLocked: false,
		}
	}
	
	constructor(data, id) {
		super(data, id)
		this.postingProject = new Project(this.postingProject)
		Post.revive_list(this.shareTree)
		
		this.publishedAt = new Date(this.publishedAt)
		
		let tsop = this.transparentShareOfPostId
		if (tsop) {
			this.transparentShareOfPost = this.shareTree.find(x=>x.postId==tsop)
		}
	}
	
	render_chain() {
		let tsp = this.transparentShareOfPost
		if (tsp) {
			let e = tsp.render_chain()
			let name = this.render_header()
			name.prepend(icon('share'))
			e.append(name)
			return e
		}
		
		let e = Draw.elem('div', {class:'post-chain col'})
		
		if (this.shareTree.length) {
			for (let post of this.shareTree)
				e.append(post.render())
		}
		
		e.append(this.render())
		
		return e
	}
	
	render_header() {
		return Draw.elem('div', {
			class: 'post-header row align wrap',
			8: [
				this.postingProject.render_link(),
				NAV.link(this.singlePostPageUrl, {
					class: 'post-time',
					8: [
						Draw.time(this.publishedAt),
					]
				})
			],
		})
	}
	
	render() {
		let name = this.render_header()
		
		let tsp = this.transparentShareOfPost
		if (tsp) {
			let e = tsp.render()
			name.prepend(icon('share'))
			e.append(name)
			return e
		}
		
		let e = Draw.elem('article', {
			class: 'post col',
			8: [name],
		})
		
		if (this.headline) {
			Draw.elem('h1', {
				2: e,
				8: [this.headline],
			})
		}
		
		let at = this.blocks.filter(x=>x.type=='attachment')
		if (at.length) {
			Draw.elem('div', {
				class: 'images row align',
				2: e,
				8: at.map(x=>{
					let a = x.attachment
					return Draw.elem('img', {
						src: a.previewURL,
						alt: a.altText,
						title: a.altText,
						loading: 'lazy',
					})
				}),
			})
		}
		
		let content = Draw.elem('mark-down')
		let sh = content.attachShadow({mode:'open'})
		let s = $prose_css.cloneNode(true)
		s.disabled = false
		sh.append(s)
		
		let res = Markdown.parse_post(this)
		
		//console.log(res)
		//return
		let d
		
		if (res.initialLength) {
			let fm = this.blocks.find(x=>x.type=='markdown')?.markdown?.content
			
			if (!/^<div\b/.test(fm) && res.initial.firstChild.tagName=='DIV') // i dont fucking know
				d = res.initial.firstChild
			else {
				d = Draw.elem('div')
				d.append(res.initial)
			}
		} else
			d = Draw.elem('div')
		
		sh.append(d)
		
		if (res.expandedLength) {
			let root = res.expanded
			//if (res.expandedLength > 1)
				root.append(...root.firstChild.childNodes)
			let nodes = [...root.childNodes]
			let a = Draw.elem('a', {class:'read-more'})
			a.textContent = "read more"
			a.onclick = ev=>{
				console.log(ev)
				let h = a.hasAttribute('data-open')
				a.toggleAttribute('data-open')
				if (h) {
					root.append(...nodes)
					a.textContent = "read more"
				} else {
					d.append(...nodes)
					a.textContent = "read less"
				}
				
			}
			sh.append(a)
		}
		
		e.append(content)
		
		return e
	}
	
	render_link() {
		let p = Draw.elem('span', {class:'pre name'})
		p.append(this.headline || this.filename)
		let a = Draw.elem('a', {class:'post-label'})
		a.href = NAV.render_link(this.singlePostPageUrl)
		a.append(p)
		return a
	}
}
