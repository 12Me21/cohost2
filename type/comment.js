class Comment extends Entity {
	static fallback(id) {
		return {
			canEdit: 'not-allowed',
			canInteract: 'not-allowed',
			canHide: 'not-allowed',
			comment: {
				body: "",
				children: [],
				commentId: id,
				deleted: false,
				postId: 0,
				postedAtISO: '2000-01-01T00:00:00Z',
				inReplyTo: "00000000-0000-0000-0000-000000000000",
				hasCohostPlus: false,
				hidden: false,
			},
			poster: {
				projectId: 0
			},
		}
	}
	
	constructor(data, id) {
		super(data, id)
		this.postedAt = new Date(this.postedAtISO)
	}
}
