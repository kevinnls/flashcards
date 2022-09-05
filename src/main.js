console.log('hello, world');

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
