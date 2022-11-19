SESS.load_cookie()

window.addEventListener('DOMContentLoaded', ev=>{
	NAV.update_from_location(window.location.hash.substring(1))
})
