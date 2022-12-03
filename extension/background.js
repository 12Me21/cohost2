"use strict"

console.log('running')

function make_filter(event, field, process) {
	browser.webRequest[event].addListener(
		({[field]:headers})=>({[field]:process(headers)}),
		{urls: ["https://cohost.org/api/v1//*"]},
		["blocking", field],
	)
}

make_filter(
	'onBeforeSendHeaders', 'requestHeaders',
	headers=>{
		console.log('got headers')
		return headers.filter(h=>{
			if (h.name.toLowerCase()=='cookie')
				return false
			if (h.name=='x_12_cookie')
				h.name = 'cookie'
			return true
		})
	},
)

make_filter(
	'onHeadersReceived', 'responseHeaders',
	headers=>{
		let h2 = headers.map(h=>{
			if (h.name.toLowerCase()=='content-language') {
				let c = headers.find(x=>x.name.toLowerCase()=='set-cookie')
				if (c)
					h.value = c.value
			}
			return h
		}).concat([
			{name:'access-control-allow-origin', value:"*"},
			{name:'access-control-allow-methods', value:"POST, GET, OPTIONS"},
			{name:'access-control-allow-headers', value:"x_12_cookie"},
			{name:'access-control-allow-credentials', value:"true"},
		])
		console.log('got response', h2)
		return h2
	},
)