export function updateCard(nextCard) {
  termBoxes.forEach((node) => (node.innerText = nextCard.term));
  defnBoxes.forEach((node) => (node.innerText = nextCard.defn));
}
export function endButton(btn){
	Object.assign(btn, {
		textContent: '|',
		disabled: true
	})
}
export function activateButton(btn){
	Object.assign(btn, {
		textContent: btn.title === 'next'? '>' : '<',
		disabled: false
	})
}
export function endDeck(direction){
	if(direction === 'fwd') {
		endButton(nextBtn)
		restartBtn.style.display = 'block';
	}
	if(direction === 'bck') {
		endButton(prevBtn)
	}
}
export function startDeck(){
	endButton(prevBtn)
	activateButton(nextBtn)
	restartBtn.style.display = 'none';
}
export function populateList(dataList) {

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
