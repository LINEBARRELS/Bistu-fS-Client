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

export const searchReducer = (state = Map({result: List([]), type: ''}), action) => {

  switch (action.actionType) {
    case 'appendContent':

      return state.updateIn(['result'], v => v.concat(List(action.content)));
      // state.concat(List(action.content))

    case 'fresh':

      return state.updateIn(['result'], v => v.mergeDeep(List(action.content)));

    case 'searchInit':
      return state.setIn(['result'], List(action.content)).setIn(['type'], action.type);

    default:
      return state
  }

}

// message:{
//   content:string,
//   from:uid
//   own:boolean 是否为自己的信息
// }

// friends:{
//   uid:{
//     username:string,
//     unread:num,
//     last:string
//   }
// }

export const messageReducer = (state = Map({unread:0,friends:Map({}),messages:List([]),on:null}), action) => {

  switch (action.type) {
    case 'newMessage':
      if(!state.hasIn(['frients',action.message.from])){
        console.log('用户初始化');
        state = state.setIn(['friends',action.message.from],Map({username:'',unread:0,last:''}))
      }
      return state.updateIn('unread', v => v+=1)
          .updateIn(['messages'],v => v.push(action.message))
          .setIn(['friends',action.message.from,'username'],action.message.username)
          .updateIn(['friends',action.message.from,'unread'],v=> ++v )
          .setIn(['friends',action.message.from,'last'],action.message.content)
    case 'clearUnread':
      return state.updateIn(['unread'], v => v = 0);
    case 'loadUser':
      return state.updateIn(['friends',action.user,'unread'], v => 0).set('on',action.user);
    default:
      return state
  }

}

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
