"use strict"

function BaseElem(ps) {
	if (ps!=undefined) {
		if (Object.getPrototypeOf(ps) != Object.prototype)
			throw new TypeError(`BaseElem expected object, got ${ps}`)
		for (let p in ps) {
			if (p == 'class') {
				console.log(p, ps[p])
				if (this.className)
					this.className += " "+ps[p]
				else
					this.className = ps[p]
			} else if (p == 8) {
				this.append(...ps[p])
			} else if (p == 2) {
				ps[p].append(this)
			} else {
				this.setAttribute(p, ps[p])
			}
		}
	}
	return this
}

// this file is messy, need to organize all this somehow..

// still scared to use this...
let HTML = ([html])=>{
	let temp = document.createElement('template')
	temp.innerHTML = html.replace(/\s*?\n\s*/g, "")
	let content = temp.content
	let root = content
	if (root.childNodes.length==1)
		root = root.firstChild
	let get_path = (root, node)=>{
		let path = ""
		while (node!==root) {
			let parent = node.parentNode
			let pos = [].indexOf.call(parent.childNodes, node)
			path = ".firstChild"+".nextSibling".repeat(pos) + path
			node = parent
		}
		return path
	}
	
	let init = `const node=document.importNode(this, true)
holder.$root=node`
	for (let node of content.querySelectorAll("[\\$]")) {
		let path = get_path(root, node)
		let id = node.getAttribute('$')
		node.removeAttribute('$')
		id = id.replace(/,/g, " = holder.$")
		init += `
holder.$${id} = node${path}`
	}
	init += `
return holder`
	let c = new Function("holder={}", init).bind(root)
	//c.prototype = {__proto__: null, template: root}
	return c
}

function icon(name, small) {
	let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
	let use = document.createElementNS("http://www.w3.org/2000/svg", 'use')
	use.href.baseVal = "res/icons.svg#"+name
	svg.append(use)
	svg.classList.add('icon')
	if (small)
		svg.classList.add('icon-20')
	return svg
}

function pre(text) {
	let s = Draw.elem('span', {class:'pre'})
	s.textContent = text
	return s
}

let gallery_placeholder = document.createElement('div')
let gallery_image = null
function gallery_show(img) {
	if (gallery_image) {
		gallery_placeholder.replaceWith(gallery_image)
		$gallery_label.textContent = ""
	}
	if (img) {
		img.replaceWith(gallery_placeholder)
		$gallery.append(img)
		$gallery_label.textContent = img.alt
	}
	gallery_image = img
	$gallery.hidden = !img
}

const Draw = {
	time(date) {
		return this.elem('time', {
			8:[this.time_string(date)]
		})
	},
	
	elem(name, p) {
		return BaseElem.call(document.createElement(name), p)
	},
	
	time_string(date) {
		// time string as something like: (depends on locale)
		// today: "10:37 AM"
		// older: "December 25, 2021, 4:09 PM"
		let options
		if (Date.now()-date.getTime() > 1000*60*60*12)
			options = {year:'numeric', month:'long', day:'numeric', hour:'numeric', minute:'2-digit'}
		else
			options = {hour:'numeric', minute:'2-digit'}
		return date.toLocaleString([], options)
	},
}
