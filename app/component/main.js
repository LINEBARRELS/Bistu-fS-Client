var React = require('react')

// import {peer} from "../dist/peer.js"

// import {Upload} from "./file/upload.js";
// import {Download} from "./file/download.js";
import Index from "./index/index-fix.js"
import {UpLoad} from "./file/upload-fix.js"
import DownLoad from "./file/download-fix.js"
import {Loader} from './util/loader.js'

import {CSSTransitionGroup} from 'transitionGroup'

class Main extends React.Component {

  render() {
    let content = null;
    switch (this.props.cur) {
      case 'index':
        content = <div className='mainSection' key={this.props.cur}><Index/></div>
        break;
      case 'download':

        content = <div className='mainSection' key={this.props.cur}><DownLoad/></div>
        break;
      case 'upload':

        content = <div className='mainSection' key={this.props.cur}><UpLoad/></div>
        break;
    }

    return <div className='main'>
      <CSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={150}>
        {content}
      </CSSTransitionGroup>
      <Loader on={this.props.loading}/>
    </div>

  }
}

export {Main};
