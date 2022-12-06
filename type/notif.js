"use strict"

class Notif {
	static Create(data, maps) {
		return new (Notif.Sub[data.type] ?? Notif)(data, maps)
	}
	
	constructor(data, maps, tp) {
		this.type = data.type
		this.createdAt = new Date(data.createdAt)
		let fp = data.fromProjectIds ?? [data.fromProjectId]
		this.fromProjects = Project.maps(maps.projects, fp)
		if (tp)
			this.toPost = Post.map(maps.posts, data.toPostId)
	}
	
	render(ic, color, action="["+this.type+"]") {
		let e = elem('div', 'notification row align wrap')
		
		ic = icon(ic, true)
		if (color)
			ic.style.color = color
		
		let fp = this.fromProjects
		let from = fp[0].render_link()
		
		let t = elem('span', 'pre')
		if (fp.length > 1)
			t.append(` and ${fp.length-1} others`)
		t.append(" "+action+" ")
		
		e.append(ic, from, t)
		return e
	}
}

// have the 'like' and 'follow' types been totally replaced by their grouped forms?
Notif.Sub = {
	like: class extends Notif {
		constructor(data, maps) {
			super(data, maps, true)
			this.relationshipId = data.relationshipId
		}
		render() {
			let e = super.render('like-filled', '#FAB', "liked")
			e.append(this.toPost.render_link())
			return e
		}
	},
	groupedLike: class extends Notif {
		constructor(data, maps) {
			super(data, maps, true)
			this.relationshipIds = data.relationshipIds
		}
		render() {
			let e = super.render('like-filled', '#FAB', "liked")
			e.append(this.toPost.render_link())
			return e
		}
	},
	
	// transparent shares use 'groupedShare', non-transparent shares still use 'share'
	share: class extends Notif {
		constructor(data, maps) {
			super(data, maps, true)
			this.sharePost = Post.map(maps.posts, data.sharePostId)
			this.transparentShare = data.transparentShare
		}
		render() {
			let e = super.render('share-filled', '#00BA7C', "shared")
			e.append(this.toPost.render_link())
			return e
		}
	},
	groupedShare: class extends Notif {
		constructor(data, maps) {
			super(data, maps, true)
			this.sharePosts = Post.maps(maps.posts, data.sharePostIds)
			this.transparentShare = data.transparentShare
		}
		render() {
			let e = super.render('share-filled', '#00BA7C', "shared")
			e.append(this.toPost.render_link())
			return e
		}
	},
	
	comment: class extends Notif {
		constructor(data, maps) {
			super(data, maps, true)
			this.comment = Comment.map(maps.comments, data.commentId)
			if (data.inReplyTo)
				this.inReplyTo = Comment.map(maps.comments, data.inReplyTo)
		}
		render() {
			let e = super.render('comment-filled', '#1D9BF0', "commented on")
			e.append(this.toPost.render_link())
			return e
		}
	},
	
	follow: class extends Notif {
		constructor(data, maps) {
			super(data, maps)
		}
		render() {
			let e = super.render('follow-filled', 'darkorchid', "followed you")
			return e
		}
	},
	groupedFollow: class extends Notif {
		constructor(data, maps) {
			super(data, maps)
		}
		render() {
			let e = super.render('follow-filled', 'darkorchid', "followed you")
			return e
		}
	},
}
