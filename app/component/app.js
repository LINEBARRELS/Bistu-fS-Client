var React = require('react');
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {Main} from "./main.js";
import {TopBar} from "./topBar/topBar.js"
//
// import {SideBar} from "./util/sideBar.js"
// import {SideBarItem} from "./util/barItem.js"
// import {Input} from './util/input.js'

import {Layout, Menu, Icon} from 'antd';
const {Sider, Content} = Layout;

import {pageAction} from "./Action/Page.js";
import {sideBarAction} from './Action/SideBar.js';

const Fragment = React.Fragment;

class App extends React.Component {
  constructor(args) {
    super(args);
  }

  fa(e) {
    e.preventDefault();
    return false
  }

  // methods
  render() {

    var dispatch = this.props.dispatch;
    const LayoutStyle = {
        width:'100vw',
        height:'100vh'
    }
    const siderStyle = {
      height:'100vh',
      position: 'fixed',
      left: 0
    }

    const contentStyle = {
      height:'100vh',
      margin:'0 0 0 160px'
    }

    return <div>
      <Layout style={LayoutStyle}>
        <Sider style={siderStyle} width={160}>
          <Menu mode='inline' theme='dark' onClick={(item) => {
             dispatch(pageAction(item.key));
           }}>
              <div id='logo'>fs client</div>
              <Menu.Item key = 'index'>
                  <Icon type="appstore" />
                  <span>主页</span>
              </Menu.Item>
              <Menu.Item key = 'download'>
                  <Icon type="download" />
                  <span>下载任务</span>
              </Menu.Item>
              <Menu.Item key = 'upload'>
                  <Icon type="cloud-upload-o" />
                  <span>上传文件</span>
              </Menu.Item>
              <Menu.Item key = 'chat'>
                  <Icon type="message"/>
                  <span>即时通信</span>
              </Menu.Item>
          </Menu>
        </Sider>
        <Content style={contentStyle}>
           <TopBar />
           <Main cur={this.props.current} loading={this.props.loading}/>
        </Content>
      </Layout>
    </div>
  }
}

function mapStateToProps(state) {
  var st = state.toJS();
  return {current: st.routerReducer.cur, barState: st.sideBarReducer, loading: st.loading}
}

export default connect(mapStateToProps)(App)
