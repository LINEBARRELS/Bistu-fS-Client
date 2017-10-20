const searchAction = function(cont,type,actionType){
	return{
		type:type,
		actionType:actionType,
		content:cont
	}
}

export {searchAction}
