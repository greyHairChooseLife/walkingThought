const writing_board = document.getElementById('writing_board');
const add_more = document.getElementById('add_more');
const pickup_list_container = document.getElementById('pickup_list_container');
const writing_board_submit = document.getElementById('writing_board_submit');

const question0 = document.getElementById('question0');
const question1 = document.getElementById('question1');
const question2 = document.getElementById('question2');
const question3 = document.getElementById('question3');
const question4 = document.getElementById('question4');
const question_arr = [question0, question1, question2, question3, question4]


for(var i=0; i<pickup_list.length; i++){
	(function(m){
		question_arr[m].addEventListener('click', () => {
			writing_board.innerHTML += `
				<div id="question_paragraph${m+1}_title">${pickup_list[m][0].question}</div>
				<input type="hidden" name="questions_title" value="${pickup_list[m][0].question}">
				<textarea id="question_paragraph${m+1}_content" name='questions_content' cols="70" rows="10"></textarea>
				`;
			question_arr[m].remove();
		});
	})(i);
}

let number_of_paragraph = 0;
add_more.addEventListener('click', () => {
	writing_board.innerHTML += `
		<div id="additional_paragraph${++number_of_paragraph}_title">added paragraph ${number_of_paragraph}</div>
		<input type="hidden" name="additions_title" value="added paragraph ${number_of_paragraph}">
		<textarea id="additional_paragraph${number_of_paragraph}_content" name='additions_content' cols="70" rows="10"></textarea>
		`;
});

writing_board_submit.addEventListener('click', () => {
	writing_board.submit();
});
