'use strict'

class Markdown {
	static f_ready = null
	static f_fail = null
	static need_blocks = 3
	static module = null
	static ready = new Promise((y,n)=>{
		this.f_ready = y
		this.f_fail = n
	})
	static parse_post(post) {
		return this.module.e2(post.blocks, new Date(post.publishedAt), {})
	}
}



//let stack = []
//let deps = {}
//let usedby = {}

const Require = function(id) {
	/*if (stack.length) {
		let current = stack[stack.length-1]
		
		let m = Require.m[id]
		let c = Require.m[current]
		if (m._where != c._where) {
			let ub = (usedby[id] ||= [])
			ub.push(current)
			
			deps[current].push(id)
		} else {
			
		}
	}*/
	
	if (Require.c[id])
		return Require.c[id].exports
	let lm = Require.m[id]
	if (!lm)
		throw new Error("module #"+id+" not found")
	let module = Require.c[id] = {
		i: id,
		l: false,
		exports: {},
	}
	//stack.push(id)
	//deps[id] = []
	lm.call(module.exports, module, module.exports, Require)
	//stack.pop()
	module.l = true
	return module.exports
}

Require.m = {} // non-loaded modules
Require.c = {} // loaded modules

// ?
Require.nmd = function(e) {
	e.paths = []
	if (!e.children)
		e.children = []
	return e
}
//
Require.o = {}.hasOwnProperty.call.bind({}.hasOwnProperty)
// export
Require.d = function(exports, t, r) {
	if ('string' == typeof t) {
		if (!Require.o(exports, t))
			Object.defineProperty(exports, t, {enumerable: true, get: r})
	} else {
		for (let n in t)
			if (Require.o(t, n) && !Require.o(exports, n))
				Object.defineProperty(exports, n, {
					enumerable: true,
					get: t[n]
				})
	}
}
// set as es6 module
Require.r = function(exports) {
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
Require.t = function(e, t) {
	if (1 & t)
		e = Require(e)
	if (8 & t)
		return e
	if (4 & t)
		if (e && e.__esModule)
			return e
	let r = Object.create(null)
	Require.r(r)
	Object.defineProperty(r, 'default', {enumerable: true, value: e})
	if (2 & t)
		if ('string' != typeof e)
			for (let o in e)
				Require.d(r, o, ()=>{e[o]})
	return r
}
// create a function that returns the module ?
// and set its .a field to a copy of the module
Require.n = function(module) {
	let t = module?.__esModule ? ()=>module.default : ()=>module
	Require.d(t, 'a', t)
	return t
}
// ?
Require.p = ''

self.__LOADABLE_LOADED_CHUNKS__ = {
	push([ids,map]) {
		try {
			for (let id in map) {
				if (Require.m[id])
					continue
				Require.m[id] = map[id]
				map[id]._where = ids
			}
			if (--Markdown.need_blocks <= 0) {
				Markdown.module = Require(21624)
				Markdown.f_ready()
			}
		} catch (e) {
			Markdown.f_fail(e)
		}
	}
}



// replace some modules that were located in client.js and other files

self.__LOADABLE_LOADED_CHUNKS__.push([[0],{
	20314() {
		this.xy = block=>{
			if (block.type=='markdown')
				return block.markdown.content
			if (block.type=='attachment') {
				const name = block.attachment.fileURL.split('/').pop()
				return name ? `[image: ${decodeURIComponent(name)}]` : '[image]'
			}
		}
		this.D_ = block=>{
			return 'string'==typeof block?.markdown?.content
		}
	},
	84879() {
		this.ou = {
			fromISO(str) {
				return {toJSDate:()=>new Date(str)}
			}
		}
	},
	67905: function (m, e, require) {
		let $45984 = require(45984)
		this.S = x=>{
			return String($45984.ZP.public.static.staticAsset({path: x}))
		}
	},
	6087() {
		this.F = null
	},
	// eh
	79829() {
		this._v = (a, b, c)=>{
			if (!Array.isArray(a))
				return a
			if ('function'==typeof b)
				return {queryKey: a, queryFn: b, ...c}
			return {queryKey: a, ...b}
		}
	},
	// iframely
	67368(m, e, require) {
		//let $79829 = require(79829)
		//let $12800 = require(12800) no
		//let $75516 = require(75516) no
		this.a = (e, t, n)=>{
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
	45984() {
		this.ZP = {
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
	94159() {
		const FRAG = this.Fragment = Symbol.for("react.fragment")
		const MEMO = Symbol.for("react.fragment")
		const FOWR = Symbol.for('react.forward_ref')
		this.memo = (type, compare=null)=>({$$typeof: MEMO, type, compare})
		this.forwardRef = (render)=>({$$typeof: FOWR, render})
		
		let N = {current: null}
		this.useContext = (e)=>N.current.useContext(e)
		this.useEffect = (e, t)=>N.current.useEffect(e, t)
		
		this.createElement = (name, attrs, ...contents)=>{
			//console.log('createElement', name, attrs, ...contents)
			let x
			if (name===FRAG) {
				x = document.createDocumentFragment()
			} else if ('string'==typeof name) {
				x = document.createElement(name)
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
			} else if ('function'==typeof name) {
				x = name(attrs)
				return x // i think?
			} else {
				//console.log('createElement ?', name, attrs, contents)
				x = document.createElement('div')
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
	},
}])
