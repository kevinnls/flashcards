//import { parse } from 'yaml';
import { load, next, prev } from './DeckFunctions.js'

const originalDeck = [];
let completedCardList = [];
let remainingCardList = [];

onmessage = async (msg) => {
	let res;
	switch(msg.data.type){
		case 'ping':
			postMessage({type: 'pong'})
			break;
		case 'prev':
			res = prev(completedCardList)
			postMessage(res)
			break;
		case 'next':
			let { res, index } = next(remainingCardList)
			postMessage(res)
			if(!loop){
				completedCardList.push(res.content)
				remainingCardList.splice(index,1)
				console.table(completedCardList)
			}
			break;
		case 'load':
			if (!msg.data.deckUrl) throw 'deckUrl not provided for loading'
			remainingCardList = await load(msg.data.deckUrl)
			postMessage({type: 'loaded'})
			break;
		default:
			throw 'unknown message type received from main'
	}
}

