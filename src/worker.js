//import { parse } from 'yaml';
import { load, next, prev } from "./DeckFunctions.js";

let originalDeck = [];
let completedCardList = [];
let remainingCardList = [];

onmessage = async (msg) => {
  let res;
  switch (msg.data.type) {
    case "ping":
      postMessage({ type: "pong" });
      break;
    case "all":
      postMessage({type: "all", content: originalDeck})
      break;
    case "prev":
      res = prev(completedCardList);
      postMessage(res);
      break;
    case "next":
      let { res, index } = next(remainingCardList);
      postMessage(res);
      if (false) {
        completedCardList.push(res.content);
        remainingCardList.splice(index, 1);
        console.table(completedCardList);
      }
      break;
    case "load":
      if (!msg.data.deckUrl) throw "deckUrl not provided for loading";
      originalDeck = await load(msg.data.deckUrl);
      remainingCardList = structuredClone(originalDeck)
      postMessage({ type: "loaded" });
      break;
    default:
      throw "unknown message type received from main";
  }
};
