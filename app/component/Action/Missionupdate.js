import { Map, List } from 'immutable';

const fmUpdateAction=function(fm){
	var t=Map({});

	

	for(let i in fm){
		var t=t.set(i,Map({fileName:fm[i].fileName,
				completed:fm[i].completed,
				total:fm[i].total,
				hash:fm[i].hash,
				status:fm[i].status,
				type:fm[i].type}));
	}


	return{
		type:'fmUpdate',
		fileMission:t
	}
}


export {fmUpdateAction}