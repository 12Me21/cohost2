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
	}
	
	render() {
		let x = document.createElement('div')
		x.className = 'post col'
		
		let name = document.createElement('div')
		name.append(this.postingProject.render_link())
		x.append(name)
		
		if (this.headline) {
			let title = document.createElement('h1')
			title.append(this.headline)
			x.append(title)
		}
		
		let content = document.createElement('div')
		let sh = content.attachShadow({mode:'open'})
		
		let s = $prose_css.cloneNode(true)
		s.disabled = false
		let res = PARSER.e2(this.blocks, new Date(this.publishedAt), {})
		console.log(this, res)
		if (res.initialLength > 1)
			sh.append(s, ...res.initial.childNodes)
		else
			sh.append(s, res.initial)
		
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
