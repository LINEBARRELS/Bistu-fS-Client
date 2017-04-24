export const routerReducer = (state={cur:'index'},action) =>{
	switch(action.type){
		case 'change':
		return Object.assign({},state,{
			cur:action.cur
		})
		default:
		return state
	}

}


export const messageReducer = (state={},action) =>{
	switch(action.type){
		case 'newMess':
		return Object.assign({},state,{
			toast:action.toast
		})
		default:
		return state
	}

}


export const fileReducer = (state={content:[]},action) =>{

	switch(action.type){
		case 'searched':
		return Object.assign({},state,{
			content:action.content
		})
		default:
		return state
	}

}

export const processReducer =(state={process:0},action)=>{


	switch(action.type){
		case 'moving':
		return Object.assign({},state,{
			process:action.process
		})
		default:
		return state
	}


}



