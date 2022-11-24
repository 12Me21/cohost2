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
			let ic = icon('like-filled')
			ic.style.color = '#FAB'
			e.append(ic, this.fromProject.render(), " liked your post")
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
			let ic = icon('share-filled')
			ic.style.color = '#00BA7C'
			e.append(ic, this.fromProject.render(), " shared your post")
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
			let ic = icon('comment-filled')
			ic.style.color = '#1D9BF0'
			e.append(ic, this.fromProject.render(), " commented on your post")
			return e
		}
	},
	follow: class ShareNotif extends Notif {
		constructor(data, maps) {
			super(data, maps)
		}
		render() {
			let e = super.render()
			let ic = icon('follow-filled')
			ic.style.color = 'darkorchid'
			e.append(ic, this.fromProject.render(), " followed you")
			return e
		}
	},
}
