"use strict"

class Project extends Entity {
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
	
	get name() {
		return this.displayName || this.handle
	}
	
	render_avatar() {
		let img = elem('img')
		img.src = this.avatarURL
		let outer = elem('div', `avatar mask-${this.avatarShape}`)
		outer.append(img)
		return outer
	}
	
	render_link() {
		let p = elem('span', 'pre')
		p.append(this.handle)
		let e = elem('span', 'name')
		e.append("@", p)
		let a = elem('a', 'project-label align')
		a.href = NAV.render_link(this.handle)
		a.append(this.render_avatar(), " ", e)
		return a
	}
}
