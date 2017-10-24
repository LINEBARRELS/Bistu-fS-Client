var React = require('react');

class BlockContent extends React.Component {
  constructor() {
    super();
  }

  render() {
    let classPlus = this.props.percent
      ? 'block-content-' + this.props.percent
      : '';
    return <div className={'block-content ' + classPlus}>{this.props.children}</div>

  }
}

export {BlockContent}
