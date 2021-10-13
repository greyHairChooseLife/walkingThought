let is_fixed = [];			//8개의 다이어리 콘텐츠가 각각 보여짐으로 고정되었는지 아닌지 판별
for(var i=0; i<8; i++){
	is_fixed[i] = false;
}

const diary_start = document.getElementsByClassName('diary_start');

// MOUSE ENTER & LEAVE & CLICK EVENT

for(let i=0; i<arr_note.length; i++){
	arr_note[i].addEventListener("mouseenter", function(){
		arr_content[i].style.display = 'block';
		arr_date[i].style.display = 'none';
		question_class[i].style.paddingTop = '0';
	});
	arr_note[i].addEventListener("mouseleave", function(){
		if(is_fixed[i] == false){
			arr_content[i].style.display = 'none';
			arr_date[i].style.display = 'block';
			question_class[i].style.paddingTop = '6%';
		}
	});

	arr_note[i].addEventListener('click', function(){
		if(is_fixed[i] == true){
			is_fixed[i] = false;
			diary_start[i].style.backgroundColor = 'transparent';
		}
		else{
			is_fixed[i] = true;
			diary_start[i].style.backgroundColor = '#59886B';
		}
	});
}


// DRAG & DROP EVENT

//set variable;
let x1;
let x2;
let y1;
let y2;

let compared_x;
let compared_y;

let selected_direction; // up, down, left, right
let cancel_move; // exception like accident click



//get coordiates %% next
everything.addEventListener("mousedown", function(e){
	x1 = e.clientX;
	y1 = e.clientY;
});
everything.addEventListener("mouseup", function(e){
	x2 = e.clientX;
	y2 = e.clientY;
	compare_coordinates(x1, x2, y1, y2);
	select_direction(compared_x, compared_y);
	move(selected_direction);
});


//compare absolute value of coordiates to know, navigate vertically or horizontally
function compare_coordinates(x1, x2, y1, y2){
	if(x2-x1 >= 0)	
		compared_x = x2-x1;
	else	
		compared_x = (x2-x1)*(-1);

	if(y2-y1 >= 0)	
		compared_y = y2-y1;
	else	
		compared_y = (y2-y1)*(-1);
};

//select move direction, up/down/left/right
function select_direction(compared_x, compared_y){
	if(compared_x == compared_y && compared_x == 0) return;  //selected_direction will be undefined
	alert(compared_x);
	alert(compared_y);
	if(compared_x >= compared_y){
		if(compared_x < window.innerWidth * 0.1 ){  //just in case they drag&drop accidently
			alert("too short movement");
			return;
		}
		if(x1 > x2)
			return selected_direction = 'left';
		else
			return selected_direction = 'right';
	}
	else
		if(compared_y < window.innerHeight * 0.1 ){
			alert("too short movement");
			return;
		}
		if(y1 > y2)
			return selected_direction = 'up';
		else
			return selected_direction = 'down';
}
