class Entity {
	static revive_map(map) {
		for (let [k,v] of Object.entries(map))
			new this(v, k)
	}
	static revive_list_map(map) {
		for (let [k, v] of Object.entries(map))
			for (let item of v)
				new this(item)
	}
	
	static map(map, id) {
		return map[id] || new this(null, id)
	}
	static maps(map, list) {
		return list.map(id=>this.map(map, id))
	}
	
	init(data) {}
	
	constructor(data=null, id=0) {
		if (!data)
			data = new.target.fallback(id)
		this.init(data)
		return Object.setPrototypeOf(data, new.target.prototype)
	}
}
