const messageReducer = (state={},action) =>{
	switch(action.type){
		case 'newMess':
		return Object.assign({},state,{
			cur:action.cur
		})
		default:
		return state
	}

}

export {messageReducer}