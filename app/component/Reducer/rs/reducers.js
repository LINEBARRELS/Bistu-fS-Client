import {Map, List} from 'immutable';

export const routerReducer = (state = Map({cur: 'index'}), action) => {
  switch (action.type) {
    case 'change':
      // return Object.assign({},state,{
      // 	cur:action.cur
      // })
      return state.updateIn(['cur'], v => action.cur)
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

export const searchReducer = (state = Map({result:List([]),type:''}), action) => {

  switch (action.actionType) {
    case 'appendContent':

      return state.updateIn(['result'], v => v.concat(List(action.content) ) );
      // state.concat(List(action.content))

    case 'fresh':

      return state.updateIn(['result'], v => v.mergeDeep(List(action.content)) );

    case 'searchInit':
      return state.setIn(['result'],List(action.content)).setIn(['type'],action.type);

    default:
      return state
  }

}

// export const processReducer = (state = Map({process: 0}), action) => {
//
//   switch (action.type) {
//     case 'moving':
//       return state.update('process', v => action.process)
//     default:
//       return state
//   }
//
// }

export const sideBarReducer = (state = false, action) => {

  switch (action.type) {
    case 'triggle':
      return !state;
    default:
      return state
  }

}

export const loading = (state = false, action) => {

  switch (action.type) {
    case 'load':
      return true;
    case 'complete':
      return false;
    default:
      return state
  }

}

export const downloadReducer = (state = Map({}), action) => {
  switch (action.type) {
    case 'fmUpdate':
      return state.mergeDeep(action.fileMission)
    default:
      return state
  }
}
