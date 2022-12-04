'use strict'

let need_blocks = 3
let ready, fail

let PARSER = new Promise((y,n)=>{
	ready = y
	fail = n
})

const n = (id)=>{
	if (n.c[id])
		return n.c[id].exports
	let lm = n.m[id]
	if (!lm)
		throw new Error("module #"+id+" not found")
	let module = n.c[id] = {
		i: id,
		l: false,
		exports: {},
	}
	lm.call(module.exports, module, module.exports, n)
	module.l = true
	return module.exports
}

n.m = {} // non-loaded modules
n.c = {} // loaded modules

n.nmd = function (e) {
	e.paths = []
	if (!e.children)
		e.children = []
	return e
}
//
n.o = (e, t)=>{
	return Object.prototype.hasOwnProperty.call(e, t)
}
// define getters on `e`
n.d = (exports, t, r)=>{
	if ('string' == typeof t) {
		if (!n.o(exports, t))
			Object.defineProperty(exports, t, {enumerable: true, get: r})
	} else {
		// i dont actually know where this is defined
		Object.defineProperties(exports, Object.fromEntries(Object.entries(t).map(([k,v])=>[k,{enumerable:true, get:v}])))
	}
}
// set as es6 module
n.r = (exports)=>{
	Object.defineProperties(exports, {
		[Symbol.toStringTag]: {value: 'Module'},
		__esModule: {value: true},
	})
}
// create a new module ??
// bit flags:
// 1 - create from other module (number)
// 2 - define properties
// 4 - skip everything if module already init as es6
// 8 - don't init as es6
n.t = (e, t)=>{
	if (1 & t)
		e = n(e)
	if (8 & t)
		return e
	if (4 & t)
		if (e && e.__esModule)
			return e
	let r = Object.create(null)
	n.r(r)
	Object.defineProperty(r, 'default', {enumerable: true, value: e})
	if (2 & t)
		if ('string' != typeof e)
			for (let o in e)
				n.d(r, o, ()=>{e[o]})
	return r
}
// create a function that returns the module ?
// and set its \.a field to a copy of the module
n.n = (module)=>{
	let t = module?.__esModule ? ()=>module.default : ()=>module
	n.d(t, 'a', t)
	return t
}
// ?
n.p = ''

self.__LOADABLE_LOADED_CHUNKS__ = {
	push([ids,map]) {
		try {
			for (let id in map) {
				if (n.m[id])
					continue
				n.m[id] = map[id]
			}
			need_blocks--
			if (need_blocks==0) {
				ready(PARSER = n(21624))
			}
		} catch (e) {
			fail(e)
		}
	}
}



// replace some modules that were located in client.js and other files

self.__LOADABLE_LOADED_CHUNKS__.push([[0],{
	20314(module, exports) {
		exports.xy = block=>{
			if (block.type=='markdown')
				return block.markdown.content
			if (block.type=='attachment') {
				const name = block.attachment.fileURL.split('/').pop();
				return name ? `[image: ${decodeURIComponent(name)}]` : '[image]'
			}
		}
		exports.D_ = block=>{
			return 'string'==typeof block?.markdown?.content
		}
	},
	84879(module, exports, require) {
		exports.ou = {
			fromISO(str) {
				return {toJSDate:()=>new Date(str)}
			}
		}
	},
	67905: function (m, exports, n) {
		let $45984 = n(45984)
		exports.S = e=>{
			return String($45984.ZP.public.static.staticAsset({path: e}))
		}
	},
	6087(module, exports) {
		exports.F = null
	},
	// eh
	79829(m, exports, n) {
		exports._v = (a, b, c)=>{
			if (!Array.isArray(a))
				return a
			if ('function'==typeof b)
				return {queryKey: a, queryFn: b, ...c}
			return {queryKey: a, ...b}
		}
	},
	// iframely
	67368(m, exports, n) {
		//let $79829 = n(79829)
		//let $12800 = n(12800) no
		//let $75516 = n(75516) no
		exports.a = (e, t, n)=>{
			//const a = $79829._v(e, t, n)
			//return $75516.r(a, $12800.z)
		}
	},
	// localization (overridden)
	84008() {
		this.ZP = {
			t(key, params) {
				return params.defaultValue.replace(/[{][{](\w+)}}/g, (_,k)=>params[k])
			}
		}
	},
	45984(m, exports) {
		exports.ZP = {
			public: {
				static: {
					staticAsset({path}) {
						let t = path.replace(/^[/]srv[/]release[/]server[/]/, "/static/")
						return new URL(t, Session.BASE)
					},
				},
				project: {
					mainAppProfile({projectHandle}) {
						return new URL(`/${projectHandle}`, Session.BASE)
					}
				},
			},
		}
	},
	94159(m, exports) {
		let N = {current: null}
		exports.memo = (type, compare=null)=>{
			return {
				$$typeof: Symbol.for('react.memo'), type, compare,
			}
		}
		exports.useContext = (e)=>{
			return N.current.useContext(e)
		}
		exports.useEffect = (e, t)=>{
			return N.current.useEffect(e, t)
		}
		const FRAG = Symbol.for("react.fragment")
		exports.createElement = (name, attrs, ...contents)=>{
			console.log('createelement?', name)
			let x = name===FRAG ? document.createDocumentFragment() : document.createElement(name)
			for (let attr in attrs) {
				let val = attrs[attr]
				if (attr=='className') {
					x.className = val
				} else if (attr=='dangerouslySetInnerHTML') {
					x.innerHTML = val.__html
				} else if (attr=='style' && val && typeof val == 'object') {
					for (let prop in val)
						x.style.setProperty(prop, val[prop])
				} else
					x.setAttribute(attr, val)
			}
			for (let c of contents) {
				if (c instanceof Node)
					x.append(c)
				else if ('string' == typeof c)
					x.append(c)
				else if (Array.isArray(c))
					x.append(...c)
				else if (c!=null)
					x.append(c)
			}
			return x
		}
		exports.Fragment = FRAG
		exports.forwardRef = (render)=>{
			return {
				$$typeof: Symbol.for('react.forward_ref'), render,
			}
		}
	},
}])
