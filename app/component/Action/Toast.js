const toastAction = function(to){
	return{
		type:'newMess',
		toast:to
	}
}

export {toastAction}