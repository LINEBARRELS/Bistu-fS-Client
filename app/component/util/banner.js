var React=require('react');
var electron= require('electron');


import { connect } from 'react-redux'
import {searchAction} from '../Action/Files.js'

var ipc =electron.ipcRenderer;


class Banner extends React.Component{
	constructor(){
		super();
	}
	render(){
		return <header className='banner' onClick={(event)=>{
			if(event.target.tagName=='LABEL'){
				var url = event.target.getAttribute('name');
				fetch('http://localhost:8080/search/'+url,{credentials:'include'}).then((resp)=>{
					if(resp.status!==200){
            			console.log("存在一个问题，状态码为："+resp.status);
            			return;
        			}
        			resp.json().then((data)=>{
								var cur = this.props.curType;
								var actionType = cur === url?'fresh':'searchInit';
        				this.props.dispatch(searchAction(data,url,actionType));
        			})
				})//fetch
			}
		}}>
			<div className='banner-item' >
				<input type='radio' name='ban'  id='hot'/>
				<label htmlFor='hot' name='hot'>最新</label>
			</div>

			<div className='banner-item' >
				<input type='radio' name='ban' id='music'/>
				<label htmlFor='music' name='music'>音乐</label>
			</div>

			<div className='banner-item' >
				<input type='radio' name='ban' id='movie'/>
				<label htmlFor='movie' name='movie'>影视</label>
			</div>

			<div className='banner-item' >
				<input type='radio' name='ban' id='game'/>
				<label htmlFor='game' name='game'>游戏</label>
			</div>

			<div className='banner-item' >
				<input type='radio' name='ban' id='doc'/>
				<label htmlFor='doc' name='doc'>文档</label>
			</div></header>
	}
}

function mapStateToProps(state) {

  var st = state.toJS();
  return {curType: st.searchReducer.type}
}

export default connect(mapStateToProps)(Banner)
