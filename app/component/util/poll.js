var React=require('react');

import { CSSTransitionGroup } from 'transitionGroup'

class Poll extends React.Component{

	render(){

		var list=this.props.children;
		var ct0=[],
			ct1=[],
			ct2=[];
		list.forEach((item,index)=>{

			if(index%3==0){
				ct0.push(item)
			}else if(index%3==1){
				ct1.push(item)
			}else if(index%3==2){
				ct2.push(item)
			}
		})

		return <div className='poll'>
			<div className='column'>
					{ct0}
			</div>
			<div className='column'>
          			{ct1}
			</div>
			<div className='column'>
          			{ct2}
        	</div>
		</div>
	}
}


export {Poll}
