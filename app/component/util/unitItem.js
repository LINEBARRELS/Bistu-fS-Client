var React = require('react');

class UnitItem extends React.Component {

  render() {
    var cl = 'unit-item'
    if (this.props.on === true) {
      cl += ' on'
    }
    return <div className={cl} data-val={this.props.data} data-id={this.props.index}>
      {this.props.children}
    </div>
  }
}

export {UnitItem}
