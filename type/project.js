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
	
	render() {
		let e = document.createElement('span')
		e.className = 'username pre'
		e.append(this.name)
		return e
	}
}
