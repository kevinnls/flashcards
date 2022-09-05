
const worker = new Worker('./src/worker.js')

const startBtn = document.getElementById('action-start')
const stopBtn = document.getElementById('action-stop')

const prevBtn = document.getElementById('action-prev')
const nextBtn = document.getElementById('action-next')
const revealBtn = document.getElementById('action-reveal')

const explainDiag = document.getElementById('explanation')

const termBoxes = document.querySelectorAll('.term')
const defnBoxes = document.querySelectorAll('.explanation')

startBtn.addEventListener('click', () => {
	console.log('hello')
	document.querySelector('main').dataset.state = "playing";
})
stopBtn.addEventListener('click', () => {
	console.log('hello')
	document.querySelector('main').dataset.state = "stopped";
})

revealBtn.addEventListener('click', () => {
	explainDiag.showModal();
	explainDiag.addEventListener('click', ({target: target}) => {if(target.nodeName === 'DIALOG')target.close()})
})

nextBtn.addEventListener('click', () => worker.postMessage({type: 'next'}));

function updateCard(nextCard){

	termBoxes.forEach(node => node.innerText = nextCard.term)
	defnBoxes.forEach(node => node.innerText = nextCard.defn)
}

worker.onmessage = (msg) => {
	console.log(msg.data.type)
	switch (msg.data.type) {
		case 'next':
			updateCard(msg.data.content)
			break;
		default:
			throw 'I HAVE NO IDEA'
	}
}

worker.onerror = console.error
