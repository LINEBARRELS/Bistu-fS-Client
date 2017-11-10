import React, {Component} from 'react';

import {Input} from './input.js'
import {SearchResult} from './searchResult.js'

class Search extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      result: [],
      search: ''
    }
  }

  setValue(event) {
    this.setState({search: event.target.value})
  }

  fetchData(event) {
    if (event.target && event.target.value !== '') {
      var header = new Headers();
      header.append('uid',window.uid)
      fetch('http://localhost:8080/baseinfo/user/'+event.target.value, {credentials: 'include',headers:header}).then((resp) => {
        if (resp.status !== 200) {
          console.log("存在一个问题，状态码为：" + resp.status);
          return;
        }
        resp.json().then((data)=>{
          this.setState({result:data})
        });
      });//fetch
    }
  }

  render() {
    return <div className='search'>
      <Input onChange={this.setValue.bind(this)} onEnter={this.fetchData.bind(this)} onBlur={()=>{this.setState(result:[])}} placeholder='搜索用户..'/>
      <SearchResult result={this.state.result} clickHandler={this.props.resultClick}/>
    </div>
  }
}

export {Search}
