if(is_written == false){
	writing_board_wrapper.style.visibility = 'visible'
	start_writing_button.style.display = 'block';
	switch (writing_board_index) {
		case 'L1' :
			L1_start.style.display = 'none';
			L1_board.style.display = 'none';
			L1.style.display = 'none';
			break;
		case 'L2' :
			L2_start.style.display = 'none';
			L2_board.style.display = 'none';
			L2.style.display = 'none';
			break;
		case 'L3' :
			L3_start.style.display = 'none';
			L3_board.style.display = 'none';
			L3.style.display = 'none';
			break;
		case 'L4' :
			L4_start.style.display = 'none';
			L4_board.style.display = 'none';
			L4.style.display = 'none';
			break;
		case 'R1' :
			R1_start.style.display = 'none';
			R1_board.style.display = 'none';
			R1.style.display = 'none';
			break;
		case 'R2' :
			R2_start.style.display = 'none';
			R2_board.style.display = 'none';
			R2.style.display = 'none';
			break;
		case 'R3' :
			R3_start.style.display = 'none';
			R3_board.style.display = 'none';
			R3.style.display = 'none';
			break;
		case 'R4' :
			R4_start.style.display = 'none';
			R4_board.style.display = 'none';
			R4.style.display = 'none';
			break;
	}
} 




for(var i=0; i < content_class.length; i++){
	content_class[i].style.display = 'none';
}


keyboard_shortcut_help.addEventListener('mouseenter', () => {
	keyboard_shortcut_help_result.style.display = 'block';
	everything.style.opacity = '50%';
});

keyboard_shortcut_help.addEventListener('mouseleave', () => {
	keyboard_shortcut_help_result.style.display = 'none';
	everything.style.opacity = '100%';
});
