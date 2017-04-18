const routerReducer = (state={cur:'index'},action) =>{
	switch(action.type){
		case 'change':
		return Object.assign({},state,{
			cur:action.cur
		})
		default:
		return state
	}

}

export {routerReducer}