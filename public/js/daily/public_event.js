if(is_written == false){
	writing_board_wrapper.style.display = 'grid'
	start_writing_button.style.display = 'block';
	switch (writing_board_index) {
		case 1 :
			R2.style.display = 'none';
			break;
		case 2 :
			R3.style.display = 'none';
			break;
		case 3 :
			R4.style.display = 'none';
			break;
		default :
			writing_board_wrapper.style.display = 'none'
			start_writing_button.style.display = 'none';
	}
} 




for(var i=0; i < content_class.length; i++){
	content_class[i].style.display = 'none';
}


//keyboard_shortcut_help.addEventListener('mouseenter', () => {
//	keyboard_shortcut_help_result.style.display = 'block';
//	everything.style.opacity = '50%';
//});
//
//keyboard_shortcut_help.addEventListener('mouseleave', () => {
//	keyboard_shortcut_help_result.style.display = 'none';
//	everything.style.opacity = '100%';
//});

//temperally added
keyboard_shortcut_help.style.cursor = 'not-allowed';
