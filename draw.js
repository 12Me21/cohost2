"use strict"

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

function elem(name, cn) {
	let x = document.createElement(name)
	if (cn)
		x.className = cn
	return x
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
	let s = elem('span', 'pre')
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
