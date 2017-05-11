import { Map, List } from 'immutable';

export const routerReducer = (state=Map({cur:'index'}),action) =>{
	switch(action.type){
		case 'change':
		// return Object.assign({},state,{
		// 	cur:action.cur
		// })
		return state.updateIn(['cur'],v=>action.cur)
		default:
		return state
	}

}


// export const messageReducer = (state={},action) =>{
// 	switch(action.type){
// 		case 'newMess':
// 		return Object.assign({},state,{
// 			toast:action.toast
// 		})
// 		default:
// 		return state
// 	}

// }


export const fileReducer = (state=Map({content:[]}),action) =>{

	switch(action.type){
		case 'searched':
		// return Object.assign({},state,{
		// 	content:action.content
		// })
		return state.updateIn(['content'],v=>action.content)

		default:
		return state
	}

}

export const processReducer =(state=Map({process:0}),action)=>{


	switch(action.type){
		case 'moving':
		return state.update('process',v=>action.process)
		default:
		return state
	}

}

// export const downloadReducer =(state=Map(),action)=>{
// 	switch(action.type){

// 	}
// }

