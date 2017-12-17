var React = require('react');
var electron = require('electron');

var ipc = electron.ipcRenderer;

import {Input} from '../util/input.js'
import {Unit} from '../util/unit.js'
import {UnitItem} from '../util/unitItem.js'

import {Map, List, is} from 'immutable';

class UpLoad extends React.Component {

  constructor() {
    super();
    this.state = {type:'doc'};
  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount(){
    ipc.on('uploadComplete',() => {
      this.setState({})
      alert('种子生成完成!')
    })

    ipc.on('uploadFail',() => {
      alert('上传失败')
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

    let keyTocheck = ['missionName','type','path']

    return keyTocheck.every((item)=>{
      return this.state[item]&&this.state[item].length!==0?true:false;
    })

  }

  submit(event) {
    let option = {
      pieceLength: 8388608,
      comment: this.state.intro,
      type: this.state.type
    }
    console.log(uid);
    ipc.send('createT', this.state, option, uid);
  }

  render() {
    let ok = this.checkState();
    return <div className='col-container'>
      <div className='col col-4 upload-col'>
        <Input label='名称' onChange={this.handleChange.bind(this)} name='missionName' />
        <Unit onItemClick={itemClick.bind(this)}>
          <UnitItem data='movie'>movie</UnitItem>
          <UnitItem data='music'>music</UnitItem>
          <UnitItem data='game'>game</UnitItem>
          <UnitItem data='doc'>doc</UnitItem>
        </Unit>
        <textarea className='text-area' label='简介,不大于100' onChange={this.handleChange.bind(this)} name='intro' ></textarea>
      </div>
      <div className='col col-6 upload-col'>
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
