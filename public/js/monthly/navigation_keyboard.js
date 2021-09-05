let trigger = false;
let selected_content;
let selected_content_status = 'none';


// judge a 'mod' key(like shift or alt or ctrl etc...) is being activated
document.addEventListener("keydown", e => {
	if(e.shiftKey == true)
		trigger = true;
})
document.addEventListener("keyup", e => {
	if(e.shiftKey == false)
		trigger = false;
})


// navigation by key stroke
document.addEventListener("keyup", e => { 
	if(trigger == true && e.key == 'ArrowUp'){
		selected_direction = 'down';
		move(selected_direction);
	}
	else if(trigger == true && e.key == 'ArrowDown'){
		selected_direction = 'up';
		move(selected_direction);
	}
	else if(trigger == true && e.key == 'ArrowLeft'){
		selected_direction = 'right';
		move(selected_direction);
	}
	else if(trigger == true && e.key == 'ArrowRight'){
		selected_direction = 'left';
		move(selected_direction);
	}
});


// targeting for event as save target's name in variable
document.addEventListener("keyup", e => {
	if(trigger == true){
		switch(e.key){
			case `!`:
				L1_sign.style.border = 'solid 5px red';
				for(var i=0; i<arr_note_sign.length; i++){
					if(i==0)
						continue;
					arr_note_sign[i].style.border = '';
				}
				selected_content = L1_board;
				break;
			case `Q`:
				L2_sign.style.border = 'solid 5px red';
				for(var i=0; i<arr_note_sign.length; i++){
					if(i==1)
						continue;
					arr_note_sign[i].style.border = '';
				}
				selected_content = L2_board;
				break;
			case `A`:
				L3_sign.style.border = 'solid 5px red';
				for(var i=0; i<arr_note_sign.length; i++){
					if(i==2)
						continue;
					arr_note_sign[i].style.border = '';
				}
				selected_content = L3_board;
				break;
			case `Z`:
				L4_sign.style.border = 'solid 5px red';
				for(var i=0; i<arr_note_sign.length; i++){
					if(i==3)
						continue;
					arr_note_sign[i].style.border = '';
				}
				selected_content = L4_board;
				break;
			case `@`:
				R1_sign.style.border = 'solid 5px red';
				for(var i=0; i<arr_note_sign.length; i++){
					if(i==4)
						continue;
					arr_note_sign[i].style.border = '';
				}
				selected_content = R1_board;
				break;
			case `W`:
				R2_sign.style.border = 'solid 5px red';
				for(var i=0; i<arr_note_sign.length; i++){
					if(i==5)
						continue;
					arr_note_sign[i].style.border = '';
				}
				selected_content = R2_board;
				break;
			case `S`:
				R3_sign.style.border = 'solid 5px red';
				for(var i=0; i<arr_note_sign.length; i++){
					if(i==6)
						continue;
					arr_note_sign[i].style.border = '';
				}
				selected_content = R3_board;
				break;
			case `X`:
				R4_sign.style.border = 'solid 5px red';
				for(var i=0; i<arr_note_sign.length; i++){
					if(i==7)
						continue;
					arr_note_sign[i].style.border = '';
				}
				selected_content = R4_board;
				break;
		}
	}
});


// open and close note_content
document.addEventListener("keyup", e => { 
	if(e.key == 'Enter'){
		if(selected_content.style.display == 'block')	  // hand over the status of target(that is returned from conditional, so we know which event will be occured
			selected_content_status = 'block';
		else if(selected_content.style.display == 'none')
			selected_content_status = 'none';

		if(selected_content_status == 'block'){
			selected_content.style.display = 'none';
			selected_content_status = 'none';
		}
		else if(selected_content_status == 'none'){
			selected_content.style.display = 'block';
			selected_content_status = 'block';
		}
	}
});

