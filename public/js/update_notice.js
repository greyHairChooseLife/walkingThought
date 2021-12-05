const board = document.getElementById('feedback_notice_board');
const quit = document.getElementById('quit');

board.addEventListener('mouseenter', () => {
	quit.style.opacity = '1';
	quit.style.color = 'white';
})
board.addEventListener('mouseleave', () => {
	quit.style.opacity = '0.1';
	quit.style.color = 'grey';
})
board.addEventListener('click', () => {
	board.style.display = 'none';
})
