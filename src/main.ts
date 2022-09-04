console.log('hello, world');

const startBtn = document.getElementById('action-start')
const nextBtn = document.getElementById('action-next')
const revealBtn = document.getElementById('action-reveal')
const termBox = document.getElementById('term')
const explainDiag = document.getElementById('explanation')

startBtn.addEventListener('click', () => {
	console.log('hello')
	document.querySelector('main').dataset.state = "playing";
})

revealBtn.addEventListener('click', () => {
	explainDiag.showModal();
	explainDiag.addEventListener('click', ({target: target}) => {if(target.nodeName === 'DIALOG')target.close()})
})
