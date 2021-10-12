if(is_written == false){
	start_writing_button.style.display = 'block';
	R4_start.style.display = 'none';
	R4_board.style.display = 'none';
	R4.style.display = 'none';
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
