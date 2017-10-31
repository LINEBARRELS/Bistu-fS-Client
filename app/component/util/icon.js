var React = require('react');

class Icon extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', (event) => {
      if(event.target !== this.icon){
          this.setState({open: false});
      }
    });
  }

  triggle() {
    var newState = !this.state.open;
    this.setState({open: newState});
  }

  render() {
    let cnPlus = this.state.open
      ? ' open'
      : '';
    return <span className={'tip-icon' + cnPlus} onClick={this.triggle.bind(this)} ref={(icon) => { this.icon = icon; }}>{this.props.children}</span>
  }
}

export {Icon}
