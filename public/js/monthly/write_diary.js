const writing_board = document.getElementById('writing_board');
const create_empty = document.getElementById('create_empty');

let number_of_paragraph = 0;
create_empty.addEventListener('click', () => {
	writing_board.innerHTML += `
		<div>${++number_of_paragraph}</div>
		<textarea cols="50" rows="10"></textarea>
		`;
});






