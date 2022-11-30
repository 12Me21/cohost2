Session.prototype.request_post = async function(handle, postId) {
	let data = await SESS.request_trpc([
		['posts.singlePost', {handle, postId}]
	])
	data = data[0].result.data
	new Post(data.post)
	revive_list_map(Comment, data.comments)
	return data
}

class PostView extends View {
	static path = [true,'post',true]
	async request() {
		let [, handle, id] = this.location
		id = parseInt(id)
		let data = await SESS.request_post(handle, id)
		this.data = data
	}
	title() {
		return "Post"
	}
	render() {
		this.$root.className += ' scroller'
		let n = document.createElement('div')
		this.$root.append(n)
		let p = this.data.post.render()
		n.append(p)
	}
}

NAV.register(PostView)
