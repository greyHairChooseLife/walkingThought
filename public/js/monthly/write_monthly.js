const writing_board = document.getElementById('writing_board');
const create_empty = document.getElementById('create_empty');
const pickup_list_container = document.getElementById('pickup_list_container');
const writing_board_submit = document.getElementById('writing_board_submit');
const question0 = document.getElementById('question0');
const question1 = document.getElementById('question1');
const question2 = document.getElementById('question2');
const question3 = document.getElementById('question3');
const question4 = document.getElementById('question4');
const question_arr = [question0, question1, question2, question3, question4]



let number_of_paragraph = 0;
create_empty.addEventListener('click', () => {
	writing_board.innerHTML += `
		<div>${++number_of_paragraph}</div>
		<textarea cols="70" rows="10"></textarea>
		`;
});


for(var i=0; i<pickup_list.length; i++){
	(function(m){
		question_arr[m].addEventListener('click', () => {
			writing_board.innerHTML += `
				<div>${pickup_list[m][0].question}</div>
				<textarea cols="70" rows="10"></textarea>
				`;
			question_arr[m].remove();
		});
	})(i);
}

writing_board_submit.addEventListener('click', () => {
	writing_board.submit();
});
