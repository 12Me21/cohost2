"use strict"

function icon(name) {
	let svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
	let use = document.createElementNS("http://www.w3.org/2000/svg", 'use')
	use.href.baseVal = "res/icons.svg#"+name
	svg.append(use)
	svg.classList.add('icon')
	return svg
}
