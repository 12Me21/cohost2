class Notif {
	static Create(data, maps) {
		return new (Notif.Sub[data.type] ?? Notif)(data, maps)
	}
	
	constructor(data, maps, fp, tp) {
		this.type = data.type
		this.createdAt = new Date(data.createdAt)
		if (fp)
			this.fromProject = Project.map(maps.projects, data.fromProjectId)
		if (tp)
			this.toPost = Post.map(maps.posts, data.toPostId)
	}
	
	render(ic, color) {
		let e = document.createElement('div')
		e.className = 'notification row'
		
		let t = document.createElement('span')
		t.className = 'pre'
		
		ic = icon(ic)
		ic.style.color = color
		
		e.append(ic, t)
		return e
	}
}

Notif.Sub = {
	like: class LikeNotif extends Notif {
		/*static inits = [
			['fromProject', 'fromProjectId', Project, 'projects'],
			['toPost', 'toPostId', Post, 'posts'],
			['relationshipId'],
		]*/
		constructor(data, maps) {
			super(data, maps, true, true)
			this.relationshipId = data.relationshipId
		}
		render() {
			let e = super.render('like-filled', '#FAB')
			e.firstChild.replaceWith(this.fromProject.render_link())
			e.lastChild.append(" liked ")
			e.append(this.toPost.render_link())
			return e
		}
	},
	share: class ShareNotif extends Notif {
		constructor(data, maps) {
			super(data, maps, true, true)
			this.sharePost = Post.map(maps.posts, data.sharePostId)
			this.transparentShare = data.transparentShare
		}
		render() {
			let e = super.render('share-filled', '#00BA7C')
			e.firstChild.after(this.fromProject.render_link())
			e.lastChild.append(" shared ")
			e.append(this.toPost.render_link())
			return e
		}
	},
	comment: class CommentNotif extends Notif {
		constructor(data, maps) {
			super(data, maps, true, true)
			this.comment = Comment.map(maps.comments, data.commentId)
			if (data.inReplyTo)
				this.inReplyTo = Comment.map(maps.comments, data.inReplyTo)
		}
		render() {
			let e = super.render('comment-filled', '#1D9BF0')
			e.firstChild.after(this.fromProject.render_link())
			e.lastChild.append(" commented on ")
			e.append(this.toPost.render_link())
			return e
		}
	},
	follow: class ShareNotif extends Notif {
		constructor(data, maps) {
			super(data, maps, true)
		}
		render() {
			let e = super.render('follow-filled', 'darkorchid')
			e.firstChild.after(this.fromProject.render_link())
			e.lastChild.append(" followed you")
			return e
		}
	},
	
	groupedLike: class GroupedLikeNotif extends Notif {
		constructor(data, maps) {
			super(data, maps, false, true)
			this.fromProjects = Project.maps(maps.projects, data.fromProjectIds)
			this.relationshipIds = data.relationshipIds
		}
		render() {
			let e = super.render('like-filled', '#FAB')
			let fp = this.fromProjects
			e.firstChild.after(fp[0].render_link())
			if (fp.length>1)
				e.lastChild.append(" and "+(fp.length-1)+" others liked ")
			else
				e.lastChild.append(" liked ")
			e.append(this.toPost.render_link())
			return e
		}
	},
}
