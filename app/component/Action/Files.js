const searchAction = function(con){
	return{
		type:'searched',
		content:con
	}
}

export {searchAction}