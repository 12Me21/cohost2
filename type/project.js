class Project {
	constructor(data=null, id=0) {
		if (!data)
			data = {
				handle: `unknown: ${id}`,
				displayName: `unknown: ${id}`,
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
		return Object.setPrototypeOf(data, Project.prototype)
	}
}
