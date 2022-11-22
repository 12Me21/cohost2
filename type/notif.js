class Notif {
	constructor(data, maps) {
		this.type = data.type
		this.createdAt = new Date(data.createdAt)
		this.fromProject = new Project(maps.projects[id], id)
		this.toPost = new Post(maps.posts[id], id)
		// type=like only:
		this.relationshipId = data.relationshipId
		// type=share only:
		if (this.sharePostId)
			this.sharePost = new Post(maps.posts[id], id)
		this.transparentShare = data.transparentShare
		//
	}
	
	render() {
		let x = document.createElement('div')
		x.className = 'notification row'
		let [name,col] = {
			like: ['like-filled', '#FAB'],//'paleturquoise' //'#F91880',
			share: ['share-filled', '#00BA7C'],
			comment: ['comment-filled', '#1D9BF0'],
			follow: ['follow-filled', 'darkorchid'], //'darkorange',
		}[notif.type]
		let ic = icon(name)
		ic.style.color = col
		x.append(ic)
		//x.append(JSON.stringify(this))
		return x
	}
}
