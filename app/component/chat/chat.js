var React = require('react');
var electron= require('electron');
import {connect} from 'react-redux'

import {Input} from '../util/input.js'
import {ItemGroup} from '../util/itemGroup.js'
import {Item} from '../util/item.js'
import {Search} from '../util/search.js'

import {loadUser} from '../Action/LoadUser.js'

var ipc =electron.ipcRenderer;


class Chat extends React.Component {
  constructor() {
    super();
    this.state={chatBar:''}
  }

  render() {
    let groupContent = [];
    let chating = [];
    let result = [];
    let chatStore = this.props.message;
    let activedUser = '';
    //左侧聊天列表
    for (var i in chatStore.friends) {
      let f = chatStore.friends[i];
      groupContent.push(
        <Item title={f.username} content={f.last} unread={f.unread} key={i} value={i} onClick={(data) => {
          this.props.dispatch(loadUser(data));
        }}>
        </Item>
      );
    }
    //右侧聊天内容
    if (chatStore.on !== null){
      for (let i of chatStore.messages) {
        if (i.from === chatStore.on) {
          let own = i.own === true
            ? 'own'
            : '';
          chating.push(
            <div className={'chat-block ' + own}>{i.content}</div>
          );
        }
      }
    }else {
      chating.push(<p>没有聊天记录</p>);
    }

    if (chatStore.on === null) {
      result.push(<p>没有聊天记录</p>);
    }else {
      result.push(<div className='chat-header'>{chatStore.friends[chatStore.on].username}</div>);
      result.push(<div className='chat-list'>{chating}</div>);
      result.push(<div className='chat-footer'><Input onChange={setInputValue.bind(this)} onEnter={sendMessage.bind(this)} value={this.state.chatBar}/><button onClick={sendMessage.bind(this)}>发送</button></div>);
    }

    return <div className='col-container'>
      <div className='col col-2 chat-user'>
        <Search resultClick={addFriends.bind(this)}/>
        <ItemGroup>
          {groupContent}
        </ItemGroup>
      </div>
      <div className='col col-5 chat-content'>
        {result}
      </div>
    </div>
  }
}

function setInputValue(event){
    this.setState({chatBar:event.target.value})
}
function sendMessage(){
  this.props.dispatch({type:'ownInput',message:{content:this.state.chatBar,from:this.props.message.on,own:true}});
  ipc.send('emitMessage',this.state.chatBar,this.props.message.on,window.uid,window.username);
  this.setState({chatBar:''});
}

function addFriends(event,data){
  this.props.dispatch({type:'userInit',userinfo:data});
}

function mapStateToProps(state) {
  var st = state.toJS();
  return {message: st.messageReducer}
}

export default connect(mapStateToProps)(Chat)
