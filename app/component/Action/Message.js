const messageAction = function(cont){
	return{
		type:typeof cont === 'object'?'newMessage':'clearUnread',
		message:cont
	}
}

export {messageAction}
