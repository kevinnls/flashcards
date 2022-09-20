const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

worker.onerror = console.error;
worker.onmessage = handleWorkerMessage;
worker.postMessage({ type: "ping" });
worker.postMessage({ type: "load", deckUrl: "../deck.min.json" });

const mainEle = document.getElementById("main");
const startBtn = document.getElementById("action-start");
const stopBtn = document.getElementById("action-stop");
const showBtn = document.getElementById("action-show");

const prevBtn = document.getElementById("action-prev");
const nextBtn = document.getElementById("action-next");
const revealBtn = document.getElementById("action-reveal");
const restartBtn = document.getElementById("action-restart");

const explainDiag = document.getElementById("explanation");
const dlContainer = document.querySelector("#full-list.container");

const termBoxes = document.querySelectorAll(".term");
const defnBoxes = document.querySelectorAll(".explanation");

startBtn.addEventListener("click", () => {
  mainEle.dataset.state = "playing";
  document.body.dataset.state = "playing";
  worker.postMessage({ type: "next" });
});
stopBtn.addEventListener("click", () => {
  mainEle.dataset.state = "landing";
  document.body.dataset.state = "landing";
  updateCard({term: "???", defn: "!!!"})
});
showBtn.addEventListener("click", () => {
	worker.postMessage({type: "all"})
})

explainDiag.addEventListener("click", ({ target: target }) => {
  if (target.nodeName === "DIALOG") target.close();
});
revealBtn.addEventListener("click", () => {
  explainDiag.showModal();
});
restartBtn.addEventListener("click", () => {
  worker.postMessage({type:'restart'})
});

nextBtn.addEventListener("click", () => worker.postMessage({ type: "next" }));
prevBtn.addEventListener("click", () => worker.postMessage({ type: "prev" }));


async function handleWorkerMessage(msg) {
  switch (msg.data.type) {
    case "pong":
      console.log("received pong from worker!");
      break;
    case "update":
      updateCard(msg.data.content);
      break;
    case "loaded":
	  document.querySelectorAll('.wait-load')
			  .forEach( e => e.disabled = false)
	  var deck = await import('./module/deck.js')
      break;

    case "all":
	  populateList(msg.data.content)
	  mainEle.dataset.state = "listing";
	  document.body.dataset.state = "listing";
	  break;
    case "start":
	  if (msg.data.dir === 'fwd') {
	    activateButton(nextBtn)
	    break;
	  }
	  activateButton(prevBtn)
	  break;
    case "end":
	  endDeck(msg.data.dir)
	  break;
    case "reset":
	  startDeck()
	  worker.postMessage({type: 'next'})
	  break;
    default:
      throw `unknown message from worker: ${msg.data.type}`;
  }
}
