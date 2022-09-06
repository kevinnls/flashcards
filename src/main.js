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

const explainDiag = document.getElementById("explanation");
const dlContainer = document.querySelector("#full-list.container");

const termBoxes = document.querySelectorAll(".term");
const defnBoxes = document.querySelectorAll(".explanation");

startBtn.addEventListener("click", () => {
  mainEle.dataset.state = "playing";
  worker.postMessage({ type: "next" });
});
stopBtn.addEventListener("click", () => {
  mainEle.dataset.state = "landing";
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

nextBtn.addEventListener("click", () => worker.postMessage({ type: "next" }));

function updateCard(nextCard) {
  termBoxes.forEach((node) => (node.innerText = nextCard.term));
  defnBoxes.forEach((node) => (node.innerText = nextCard.defn));
}
function populateList(dataList) {

	if (dlContainer.dataset.populated === "true" ) return

	const dl = document.createElement('dl')
	dataList.forEach( item => {
		dl.appendChild(
			Object.assign(document.createElement('dt'),{textContent: item.term, className: 'term'}))
		dl.appendChild(
			Object.assign(document.createElement('dd'),{textContent: item.defn, className: 'explanation'}))
	})
	dlContainer.replaceChild(dl, dlContainer.children[0])
	dlContainer.dataset.populated=true
}

function handleWorkerMessage(msg) {
  switch (msg.data.type) {
    case "pong":
      console.log("received pong from worker!");
      break;
    case "next":
      updateCard(msg.data.content);
      break;
    case "loaded":
	  document.querySelectorAll('.wait-load')
			  .forEach( e => e.disabled = false)
      break;

    case "all":
	  populateList(msg.data.content)
	  mainEle.dataset.state = "listing";
	  break;
    default:
      throw `unknown message from worker: ${msg.data.type}`;
  }
}
