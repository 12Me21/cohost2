class Notif {
	static Create(data, maps) {
		return new (Notif.Sub[data.type] ?? Notif)(data, maps)
	}
	
	constructor(data, maps) {
		this.type = data.type
		this.createdAt = new Date(data.createdAt)
		this.fromProject = maps.projects[data.fromProjectId]
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
			this.toPost = maps.posts[data.toPostId]
			this.relationshipId = data.relationshipId
		}
		render() {
			let e = super.render()
			e.firstChild.replaceWith(this.fromProject.render())
			e.lastChild.append(" liked your post")
			let ic = icon('like-filled')
			ic.style.color = '#FAB'
			e.prepend(ic)
			return e
		}
	},
	share: class ShareNotif extends Notif {
		constructor(data, maps) {
			super(data, maps)
			this.toPost = maps.posts[data.toPostId]
			this.sharePost = maps.posts[data.sharePostId]
			this.transparentShare = data.transparentShare
		}
		render() {
			let e = super.render()
			e.firstChild.replaceWith(this.fromProject.render())
			e.lastChild.append(" shared your post")
			let ic = icon('share-filled')
			ic.style.color = '#00BA7C'
			e.prepend(ic)
			return e
		}
	},
	comment: class CommentNotif extends Notif {
		constructor(data, maps) {
			super(data, maps)
			this.toPost = maps.posts[data.toPostId]
			this.comment = maps.comments[data.commentId]
			if (data.inReplyTo)
				this.inReplyTo = maps.comments[data.inReplyTo]
		}
		render() {
			let e = super.render()
			e.firstChild.replaceWith(this.fromProject.render())
			e.lastChild.append(" commented on your post")
			let ic = icon('comment-filled')
			ic.style.color = '#1D9BF0'
			e.prepend(ic)
			return e
		}
	},
	follow: class ShareNotif extends Notif {
		constructor(data, maps) {
			super(data, maps)
		}
		render() {
			let e = super.render()
			e.firstChild.replaceWith(this.fromProject.render())
			e.lastChild.append(" followed you")
			let ic = icon('follow-filled')
			ic.style.color = 'darkorchid'
			e.prepend(ic)
			return e
		}
	},
}
