for(var i=0; i < arr_note_board.length; i++){
	arr_note_board[i].style.display = 'none';
}

for(let i=0; i<arr_note_sign.length; i++){
	arr_note_sign[i].addEventListener("mouseenter", function(){
		arr_note_board[i].style.display = 'block';
	});
	arr_note_sign[i].addEventListener("mouseleave", function(){
		arr_note_board[i].style.display = 'none';
	});
}


keyboard_shortcut_help.addEventListener('mouseenter', () => {
	keyboard_shortcut_help_result.style.display = 'block';
	everything.style.opacity = '50%';
});

keyboard_shortcut_help.addEventListener('mouseleave', () => {
	keyboard_shortcut_help_result.style.display = 'none';
	everything.style.opacity = '100%';
});
