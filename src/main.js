
const worker = new Worker(new URL('./worker.js',import.meta.url), {type:"module"})
worker.onerror = console.error
worker.onmessage = handleWorkerMessage
worker.postMessage({type: 'ping'})
worker.postMessage({type:'load', deckUrl: '../deck.min.json'})

const startBtn = document.getElementById('action-start')
const stopBtn = document.getElementById('action-stop')

const prevBtn = document.getElementById('action-prev')
const nextBtn = document.getElementById('action-next')
const revealBtn = document.getElementById('action-reveal')

const explainDiag = document.getElementById('explanation')

const termBoxes = document.querySelectorAll('.term')
const defnBoxes = document.querySelectorAll('.explanation')

startBtn.addEventListener('click', () => {
	document.querySelector('main').dataset.state = "playing";
	worker.postMessage({type: 'next'})
})
stopBtn.addEventListener('click', () => {
	document.querySelector('main').dataset.state = "stopped";
})

explainDiag.addEventListener('click', ({target: target}) => {
	if (target.nodeName === 'DIALOG') target.close()
})
revealBtn.addEventListener('click', () => {
	explainDiag.showModal()
})

nextBtn.addEventListener('click', () => worker.postMessage({type: 'next'}));

function updateCard(nextCard){

	termBoxes.forEach(node => node.innerText = nextCard.term)
	defnBoxes.forEach(node => node.innerText = nextCard.defn)
}

function handleWorkerMessage (msg) {
	switch (msg.data.type) {
		case 'pong':
			console.log('received pong from worker!')
			break;
		case 'next':
			updateCard(msg.data.content)
			break;
		case 'loaded':
			startBtn.disabled = false;
			break;


		default:
			throw `unknown message from worker: ${msg.data.type}`
	}
}

