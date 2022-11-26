class Project {
	static fallback(id) {
		return {
			handle: `unknown: ${id}`,
			displayName: "", // will be "" if user hasnt set custom display name; use handle instead in that case
			dek: "", // ("headline")
			description: "",
			avatarURL: "",
			avatarPreviewURL: "",
			headerURL: null, // these are nullable
			headerPreviewURL: null,
			projectId: id,
			privacy: 'private', // "public" | "private"(i assume)
			pronouns: "",
			url: "",
			flags: [], //array of strings - these are like 'badges' basically i think. e.g. "flags": ["friendOfTheSite"],
			avatarShape: 'roundrect', // "roundrect" | "circle" | "squircle"
		}
	}
	
	constructor(data=null, id=0) {
		if (!data)
			data = Project.fallback(id)
		return Object.setPrototypeOf(data, Project.prototype)
	}
	
	get name() {
		return this.displayName || this.handle
	}
	
	render_avatar() {
		let img = document.createElement('img')
		img.src = this.avatarURL
		let outer = document.createElement('div')
		outer.className = 'avatar'
		outer.className += " mask-"+this.avatarShape
		outer.append(img)
		return outer
	}
	
	render() {
		let av = this.render_avatar()
		let e = document.createElement('span')
		e.className = 'name'
		let p = document.createElement('span')
		p.className = 'pre'
		p.append(this.handle)
		e.append("@", p)
		let q = document.createElement('span')
		q.className = 'project-label'
		q.append(av, " ", e)
		return q
	}
}
