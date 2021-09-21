// pick 5 question event
// pick 5 question event
const how_many_questions = 5;

const start_button = document.getElementById('start_button');
const left = document.getElementById('left');
const left_question = document.getElementById('left_question');
const left_content = document.getElementById('left_content');
const right = document.getElementById('right');
const right_question = document.getElementById('right_question');
const right_content = document.getElementById('right_content');
const answer_board = document.getElementById('answer_board');
const write_monthly = document.getElementById('write_monthly');

const origin_arr = calendar_data; // get original base data from ejs
let temp_arr = []; // have base data from deep copy of original data or filtered data from bin_arr
let bin_arr = []; // keep data which is thrown by user to re-use as next base data

let index_arr = []; // pick and have indexes. Both should be lower than the length of temp_arr tha is keeping base data.
let answer_arr = []; // keep the final data from temp_arr as user picks.


// functino to mix array contents randomly. Not to make them boring.
function randomize_arr(arr){
	let temp = arr.slice(); // without slick(), the value just works like pointer in C language.
	let result_arr = [];
	while(temp.length != 0){
		let index = Math.floor(Math.random() * 100) % temp.length; // random int from 0 to 99 and make it be lower than arrays length so it can be useable as index of the array.
		result_arr.push(temp.splice(index, 1));
	}
	return result_arr;
};

//get random numbur to use as index. Which is lower than length of temp_arr.
function set_index_arr(){
	if(temp_arr.length > 1){
		if(index_arr.length == 2){ //flush array before re-use
			index_arr = [];
		}
		const a = Math.floor(Math.random() * 100) % temp_arr.length;
		index_arr.push(a);
		let b;
		while(b === undefined || b === a){
			b = Math.floor(Math.random() * 100) % temp_arr.length;
		}
		index_arr.push(b);
	} else{ // last normal index array shows [0, 1] or [1, 0] and the index value 1 will try to get undefined array element
		index_arr = [0, 0];
	}
}

// pop selected element through index from temp_arr
function pop_temp_arr(i){
	bin_arr.push(temp_arr.splice(i, 1)[0][0]); // pop selected one and put that in bin_arr so we can get a filtered new temp_arr
}

//show diary content so user can select which one to keep from both candidates.
function show_candis(){
	left_question.innerHTML = temp_arr[index_arr[1]][0].question;  // if we want to change from "which one to keep" to "which one to thow", the indexes should be changed each other 
	left_content.innerHTML = temp_arr[index_arr[1]][0].content;
	right_question.innerHTML = temp_arr[index_arr[0]][0].question;
	right_content.innerHTML = temp_arr[index_arr[0]][0].content;
}

//show answer array on answer_board. 
function show_answer_arr(length){
	answer_board.innerHTML = ''; // reset board.
	for(var i=0; i<length; i++)
		answer_board.innerHTML += answer_arr[i][0].question+'<br>';
}

start_button.addEventListener('click', () => {
	start_button.style.display = 'none';
	left.style.display = 'block';
	right.style.display = 'block';

	if(answer_arr.length < 1){
		temp_arr = randomize_arr(origin_arr);
	} else{
		temp_arr = randomize_arr(bin_arr);
		bin_arr = [];
	}
	set_index_arr();
	show_candis();
});

left.addEventListener('click', () => {
	if(temp_arr.length > 1){
		pop_temp_arr(index_arr[0]);
		set_index_arr();
		show_candis();
	} else {
		answer_arr.push(temp_arr[0]);
		show_answer_arr(answer_arr.length);
		if(answer_arr.length < how_many_questions){
			start_button.style.display = 'block';
			left.style.display = 'none';
			right.style.display = 'none';
		} else{
			write_monthly.style.display = 'block';
			document.getElementById('answer_arr_to_server').value = JSON.stringify(answer_arr);
			left.style.display = 'none';
			right.style.display = 'none';
		}
	}
});

right.addEventListener('click', () => {
	if(temp_arr.length > 1){
		pop_temp_arr(index_arr[1]);
		set_index_arr();
		show_candis();
	} else {
		answer_arr.push(temp_arr[0]);
		show_answer_arr(answer_arr.length);
		if(answer_arr.length < how_many_questions){
			start_button.style.display = 'block';
			left.style.display = 'none';
			right.style.display = 'none';
		} else{
			write_monthly.style.display = 'block';
			document.getElementById('answer_arr_to_server').value = JSON.stringify(answer_arr);
			left.style.display = 'none';
			right.style.display = 'none';
		}
	}
});
