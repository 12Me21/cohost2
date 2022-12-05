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
		let x = document.createElement('article')
		x.className = 'post col'
		
		let name = document.createElement('div')
		name.append(this.postingProject.render_link())
		x.append(name)
		
		if (this.transparentShareOfPost) {
			name.prepend(icon('share'))
			x.append(this.transparentShareOfPost.render())
			return x
		}
		
		if (this.shareTree.length) {
			name.prepend(icon('share'))
			for (let post of this.shareTree)
				x.append(post.render())
		}
		
		if (this.headline) {
			let title = document.createElement('h1')
			title.append(this.headline)
			x.append(title)
		}
		
		let at = this.blocks.filter(x=>x.type=='attachment')
		if (at.length) {
			let imgs = document.createElement('div')
			imgs.className = 'row images'
			for (let {attachment:{previewURL, fileURL, altText}} of at) {
				let img = document.createElement('img')
				img.src = previewURL
				img.alt = altText
				img.title = altText
				img.loading = 'lazy'
				imgs.append(img)
			}
			x.append(imgs)
		}
		
		let content = document.createElement('mark-down')
		let sh = content.attachShadow({mode:'open'})
		
		let s = $prose_css.cloneNode(true)
		s.disabled = false
		let res = PARSER.e2(this.blocks, new Date(this.publishedAt), {})
		let st = res.initial
		if (res.initialLength == 1) {
			let d = document.createElement('div')
			d.append(st)
			st = d
		}
		sh.append(s, st)
		
		x.append(content)
		
		return x
	}
	
	render_link() {
		let p = document.createElement('span')
		p.className = 'pre name'
		p.append(this.headline || this.filename)
		let q = document.createElement('a')
		let url = this.singlePostPageUrl.replace("https://cohost.org/", "")
		q.href = NAV.render_link(url)
		q.className = 'post-label'
		q.append(p)
		return q
	}
}
