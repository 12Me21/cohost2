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
	
	static compare_handles(a, b) {
		return a.toLowerCase() == b.toLowerCase()
	}
	
	get name() {
		return this.displayName || "@"+this.handle
	}
	
	render_avatar() {
		let img = Draw.elem('img')
		img.src = this.avatarURL
		let outer = Draw.elem('div', {class:`avatar mask-${this.avatarShape}`})
		outer.append(img)
		return outer
	}
	
	render_handle() {
		let e = Draw.elem('span', {class:'name'})
		e.append("@", pre(this.handle))
		return e
	}
	
	render_link() {
		let e = this.render_handle()
		let a = Draw.elem('a', {class:'project-label align'})
		a.href = NAV.render_link(this.handle)
		a.append(this.render_avatar(), " ", e)
		return a
	}
}
