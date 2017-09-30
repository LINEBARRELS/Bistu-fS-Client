var React=require('react');


import { connect } from 'react-redux'

import {Main} from "./main.js"
import {TopBar} from "./topBar/topBar.js"


import {SideBar} from "./util/sideBar.js"
import {SideBarItem} from "./util/barItem.js"
import {Input} from './util/input.js'


import {pageAction} from "./Action/Page.js"
import {sideBarAction} from './Action/SideBar.js'

class App extends React.Component {
	constructor(args) {
		super(args);

	}



  fa(e){
  		e.preventDefault();
  		return false
  }

	// methods
	render(){

    var dispatch=this.props.dispatch;

		return <div onDrap={this.fa.bind(this)}>
    <TopBar cur={this.props.current} onLogoClick={()=>{
      dispatch(sideBarAction());
    }}><Input onKeyDown={(event)=>{
        console.log(event.key)
    }} type='dark' id='top-search'/>
    </TopBar>

    <SideBar visiable={this.props.barState} className='sideBar' itemEvent={(data)=>{
         dispatch(pageAction(data));
    }} itemClass='side-item' active={this.props.current}>
      <SideBarItem img='D:\frontEnd\Bistu-fS-Client\app\img\index.png' data='index' disc='主页'/>
      <SideBarItem img='D:\frontEnd\Bistu-fS-Client\app\img\download.png' data='download' disc='下载'/>
      <SideBarItem img='D:\frontEnd\Bistu-fS-Client\app\img\upload.png' data='upload' disc='上传文件'/>
    </SideBar>

    <Main cur={this.props.current} loading={this.props.loading}/>
    </div>
	}
}


function mapStateToProps(state){
  var st=state.toJS();
  return {
    current:st.routerReducer.cur,
    barState:st.sideBarReducer,
    loading:st.loading
  }
}

export default connect(mapStateToProps)(App)

