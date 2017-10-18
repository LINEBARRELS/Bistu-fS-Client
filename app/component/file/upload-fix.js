var React = require('react');
var electron = require('electron');

var ipc = electron.ipcRenderer;

import {Input} from '../util/input.js'
import {Unit} from '../util/unit.js'
import {UnitItem} from '../util/unitItem.js'
import {Tag} from '../util/tag.js'

import {Map, List, is} from 'immutable';

class UpLoad extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  shouldComponentUpdate(nextProps = {}, nextState = {}) {
    const thisProps = this.props || {},
      thisState = this.state || {};
    if (thisState['search'] !== nextState['search']) {
      return false;
    }

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length || Object.keys(thisState).length !== Object.keys(nextState).length) {
      return true;
    }

    for (const key in nextProps) {
      if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    for (const key in nextState) {
      if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  checkState() {

    if (Object.keys(this.state).length < 5) {
      return false;
    }

    for (let key in this.state) {
      if (this.state[key] === '') {
        return false;
      }
    }

    return true;
  }

  submit(event) {
    let option = {
      pieceLength: 8388608,
      comment: this.state.intro,
      type: this.state.type
    }
    ipc.send('createT', this.state, option);
  }

  render() {
    let ok = this.checkState();
    return <div className='col-container'>
      <div className='col col-4'>
        <Input placeholder='名称' onChange={this.handleChange.bind(this)} name='missionName'/>
        <Unit onItemClick={itemClick.bind(this)}>
          <UnitItem data='movie'>movie</UnitItem>
          <UnitItem data='music'>music</UnitItem>
          <UnitItem data='game'>game</UnitItem>
          <UnitItem data='doc'>doc</UnitItem>
        </Unit>
        <textarea className='text-area' placeholder='简介,不大于100' onChange={this.handleChange.bind(this)} name='intro'></textarea>
        <Tag onChange={tagSelect.bind(this)}/>
      </div>
      <div className='col col-6'>
        <div className='file-select' onDrop={fileSelect.bind(this)}>把文件拖放至此<small>记得把文件放入客户端所在的file文件夹中,否则无法共享</small>
        </div>
        <button className='submit-button' disabled={!ok} onClick={this.submit.bind(this)}>commit!</button>
      </div>
    </div>
  }
}
//class

function tagSelect(data) {
  this.setState({tags: data})
}

function fileSelect(event) {
  // var path=e.dataTransfer.files[0].path.split('\\').join('/');
  // console.log(event.dataTransfer.files)
  event.target.setAttribute('selected', event.dataTransfer.files[0].path)
  this.setState({path: event.dataTransfer.files[0].path, fileName: event.dataTransfer.files[0].name})
}

function itemClick(event, data) {

  this.setState({type: data})
}

export {UpLoad}
