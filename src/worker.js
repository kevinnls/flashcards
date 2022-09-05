onmessage = (msg) => {
	console.log(msg)
	switch(msg.data.type){
		case 'ping':
			postMessage({type: 'pong'})
			break
		case 'next':
			postMessage(nextCard())
			break;
		default:
			throw 'I HAVE NO IDEA'
	}
}

function nextCard(){
	return {
		type: 'next',
		content: {
			term: 'hello',
			defn: 'world'
		}
	}
}
