const fileReducer = (state={content:[]},action) =>{
	switch(action.type){
		case 'searched':
		return Object.assign({},state,{
			content:action.content
		})
		default:
		return state
	}

}

export {fileReducer}