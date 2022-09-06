export { prevCard as prev, nextCard as next, loadDeck as load };

function randInt(max = 10) {
  return Math.floor(Math.random() * max);
}
function prevCard(cardList) {
  return {
    type: "prev",
    content: cardList.at(-1),
  };
}
function nextCard(cardList) {
  const randIndex = randInt(cardList.length);
  const randCard = cardList.at(randIndex);
  return {
    res: {
      type: "next",
      content: randCard,
    },
    index: randIndex,
  };
}

async function readStream(reader) {
  //TODO
}

async function loadDeck(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw "trouble accessing deck file";
    }
    if (/.*\.json$/.test(url)) {
      return await res.json();
    }
    if (/.*\.y(a)?ml$/.test(url)) {
      console.warn("yaml file not yet supported");
      throw "YAML not yet supported";
      //TODO
      //readStream(res.body.getReader())
    }
  } catch (e) {
    console.error(e);
    throw "something happened trying to read Deck File";
  }
}
