var React = require('react');
import {CSSTransitionGroup} from 'transitionGroup'

class ItemGroup extends React.Component {
  constructor() {
    super();
  }

  render(){
    return <div className='item-group'>
    <CSSTransitionGroup transitionName="tagAni" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
      {this.props.children}
    </CSSTransitionGroup>
    </div>
  }
}

export {ItemGroup}
