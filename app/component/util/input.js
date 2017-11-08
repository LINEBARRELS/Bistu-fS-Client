var React = require('react');

class Input extends React.Component {

  active(event) {
    event.target.classList.add('on');
  }

  recover(event) {
    if (event.target.value.length === 0) {
      event.target.classList.remove('on');
    }
  }

  warp(fn,val){
    return function(event){
      this.props[val](event.target.value);
    }
  }

  onEnterPress(event){

    if (event.keyCode === 13) {
        if (this.props.onEnter) {
          this.props.onEnter(event)
        }
    }
  }


  render() {

    var cl = 'input';
    var ph = this.props.label
      ? <label htmlFor={this.props.name}>{this.props.label + ':'}</label>
      : null;

    if (this.props.className) {
      cl = cl + ' ' + this.props.className
    }

    return <div className={cl} id={this.props.id}>
      {ph}
      <input type='text' onKeyDown={this.props.onKeyDown}
        onChange={this.props.onChange}
        onFocus={this.active.bind(this)}
        onBlur={this.recover.bind(this)}
        onKeyDown={this.onEnterPress.bind(this)}
        value={this.props.value}
        name={this.props.name}
        id={this.props.name}
        placeholder={this.props.placeholder}/>
      {this.props.children}
    </div>
  }
}

export {Input}
