const messageReducer = (state={},action) =>{
	switch(action.type){
		case 'newMess':
		return Object.assign({},state,{
			toast:action.toast
		})
		default:
		return state
	}

}

export {messageReducer}