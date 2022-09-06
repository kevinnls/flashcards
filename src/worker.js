//import { parse } from 'yaml';
import { load, next, prev } from "./DeckFunctions.js";

let originalDeck = [];
let completedCardList = [];
let remainingCardList = [];
let currentIndex = 0;

onmessage = async (msg) => {
  switch (msg.data.type) {
    case "ping":
      postMessage({ type: "pong" });
      break;
    case "all":
      postMessage({type: "all", content: originalDeck})
      break;
    case "prev":
      currentIndex -= 1
      if (currentIndex > 0) {
	      postMessage(prev(currentIndex, completedCardList));
      }
      if(currentIndex === 1) {
	      postMessage({ type: 'end', dir: 'bck' })
      }
      break;
 
    case "next":
      currentIndex += 1
      if (remainingCardList.length === 0){
	      postMessage({type: 'end', dir: 'fwd'})
	      break;
      }
      if (completedCardList.length === 1 || currentIndex === 2)
	      postMessage({type: 'start'})

      if(currentIndex <= completedCardList.length){
	      postMessage({type: 'update', content: completedCardList.at(currentIndex - 1)})
	      break;
      }

      let { res, index } = next(remainingCardList);
      postMessage(res);
      completedCardList.push(res.content);
      remainingCardList.splice(index, 1);
      break;
    case "load":
      if (!msg.data.deckUrl) throw "deckUrl not provided for loading";
      originalDeck = await load(msg.data.deckUrl);
      remainingCardList = structuredClone(originalDeck)
      postMessage({ type: "loaded" });
      break;
    case "restart":
      remainingCardList = structuredClone(originalDeck)
      completedCardList = []
      currentIndex = 0
      postMessage({ type: 'reset' })
      break;
    default:
      throw `unknown message type received from main ${msg.data.type}`;
  }
};
