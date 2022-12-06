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
		
		let tsop = this.transparentShareOfPostId
		if (tsop) {
			this.transparentShareOfPost = this.shareTree.find(x=>x.postId==tsop)
		}
	}
	
	render() {
		let e = elem('article', 'post col')
		
		let name = elem('div', 'row align wrap')
		name.append(this.postingProject.render_link())
		e.append(name)
		
		if (this.transparentShareOfPost) {
			name.prepend(icon('share'))
			e.append(this.transparentShareOfPost.render())
			return e
		}
		
		if (this.shareTree.length) {
			name.prepend(icon('share'))
			for (let post of this.shareTree)
				e.append(post.render())
		}
		
		if (this.headline) {
			let title = elem('h1')
			title.append(this.headline)
			e.append(title)
		}
		
		let at = this.blocks.filter(x=>x.type=='attachment')
		if (at.length) {
			let imgs = elem('div', 'images row align')
			for (let {attachment:{previewURL, fileURL, altText}} of at) {
				let img = elem('img')
				img.src = previewURL
				img.alt = altText
				img.title = altText
				img.loading = 'lazy'
				imgs.append(img)
			}
			e.append(imgs)
		}
		
		let content = elem('mark-down')
		let sh = content.attachShadow({mode:'open'})
		let s = $prose_css.cloneNode(true)
		s.disabled = false
		sh.append(s)
		
		let res = PARSER.e2(this.blocks, new Date(this.publishedAt), {})
		
		//console.log(res)
		
		let d
		
		if (res.initialLength) {
			if (res.initialLength > 1)
				d = res.initial.firstChild
			else {
				d = elem('div')
				d.append(res.initial)
			}
		} else
			d = elem('div')
		
		sh.append(d)
		
		if (res.expandedLength) {
			let root = res.expanded
			if (res.expandedLength > 1)
				root.append(...root.firstChild.childNodes)
			let nodes = [...root.childNodes]
			let a = elem('a', 'read-more')
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
		let p = elem('span', 'pre name')
		p.append(this.headline || this.filename)
		let url = this.singlePostPageUrl.replace("https://cohost.org/", "")
		let a = elem('a', 'post-label')
		a.href = NAV.render_link(url)
		a.append(p)
		return a
	}
}
