class Post {
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
	
	constructor(data=null, id=0) {
		if (!data)
			data = Post.fallback(id)
		Object.setPrototypeOf(data, Post.prototype)
		data.postingProject2 = new Project(data.postingProject)
	}
}
