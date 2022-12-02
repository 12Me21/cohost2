class Notif {
	static Create(data, maps) {
		return new (Notif.Sub[data.type] ?? Notif)(data, maps)
	}
	
	constructor(data, maps) {
		this.type = data.type
		this.createdAt = new Date(data.createdAt)
	}
	
	render() {
		let x = document.createElement('div')
		x.className = 'notification row'
		let s = document.createElement('span')
		let t = document.createElement('span')
		t.className = 'pre'
		x.append(s, t)
		return x
	}
}

Notif.Sub = {
	like: class LikeNotif extends Notif {
		constructor(data, maps) {
			super(data, maps)
			this.fromProject = Project.map(maps.projects, data.fromProjectId)
			this.toPost = Post.map(maps.posts, data.toPostId)
			this.relationshipId = data.relationshipId
		}
		render() {
			let e = super.render()
			e.firstChild.replaceWith(this.fromProject.render_link())
			e.lastChild.append(" liked ")
			e.append(this.toPost.render_link())
			let ic = icon('like-filled')
			ic.style.color = '#FAB'
			e.prepend(ic)
			return e
		}
	},
	share: class ShareNotif extends Notif {
		constructor(data, maps) {
			super(data, maps)
			this.fromProject = Project.map(maps.projects, data.fromProjectId)
			this.toPost = Post.map(maps.posts, data.toPostId)
			this.sharePost = Post.map(maps.posts, data.sharePostId)
			this.transparentShare = data.transparentShare
		}
		render() {
			let e = super.render()
			e.firstChild.replaceWith(this.fromProject.render_link())
			e.lastChild.append(" shared ")
			e.append(this.toPost.render_link())
			let ic = icon('share-filled')
			ic.style.color = '#00BA7C'
			e.prepend(ic)
			return e
		}
	},
	comment: class CommentNotif extends Notif {
		constructor(data, maps) {
			super(data, maps)
			this.fromProject = Project.map(map.projects, data.fromProjectId)
			this.toPost = Post.map(maps.posts, data.toPostId)
			this.comment = Comment.map(maps.comments, data.commentId)
			if (data.inReplyTo)
				this.inReplyTo = Comment.map(maps.comments, data.inReplyTo)
		}
		render() {
			let e = super.render()
			e.firstChild.replaceWith(this.fromProject.render_link())
			e.lastChild.append(" commented on ")
			e.append(this.toPost.render_link())
			let ic = icon('comment-filled')
			ic.style.color = '#1D9BF0'
			e.prepend(ic)
			return e
		}
	},
	follow: class ShareNotif extends Notif {
		constructor(data, maps) {
			super(data, maps)
			this.fromProject = Project.map(maps.projects, data.fromProjectId)
		}
		render() {
			let e = super.render()
			e.firstChild.replaceWith(this.fromProject.render_link())
			e.lastChild.append(" followed you")
			let ic = icon('follow-filled')
			ic.style.color = 'darkorchid'
			e.prepend(ic)
			return e
		}
	},
	
	groupedLike: class GroupedLikeNotif extends Notif {
		constructor(data, maps) {
			super(data, maps)
			this.toPost = Post.map(maps.posts, data.toPostId)
			this.fromProjects = Project.maps(maps.projects, data.fromProjectIds)
			this.relationshipIds = data.relationshipIds
		}
		render() {
			let e = super.render()
			let fp = this.fromProjects
			e.firstChild.replaceWith(fp[0].render_link())
			if (fp.length>1)
				e.lastChild.append(" and "+(fp.length-1)+" others liked ")
			else
				e.lastChild.append(" liked ")
			e.append(this.toPost.render_link())
			let ic = icon('like-filled')
			ic.style.color = '#FAB'
			e.prepend(ic)
			return e
		}
	},
}
