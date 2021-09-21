const question1_title = document.getElementById('question1_title');
const question2_title = document.getElementById('question2_title');
const question3_title = document.getElementById('question3_title');
const question4_title = document.getElementById('question4_title');
const question5_title = document.getElementById('question5_title');
const addition1_title = document.getElementById('addition1_title');
const addition2_title = document.getElementById('addition2_title');
const addition3_title = document.getElementById('addition3_title');
const title_arr = [question1_title, question2_title, question3_title, question4_title, question5_title, addition1_title, addition2_title, addition3_title];

const question1_content = document.getElementById('question1_content');
const question2_content = document.getElementById('question2_content');
const question3_content = document.getElementById('question3_content');
const question4_content = document.getElementById('question4_content');
const question5_content = document.getElementById('question5_content');
const addition1_content = document.getElementById('addition1_content');
const addition2_content = document.getElementById('addition2_content');
const addition3_content = document.getElementById('addition3_content');
const content_arr = [question1_content, question2_content, question3_content, question4_content, question5_content, addition1_content, addition2_content, addition3_content];

const m1 = document.getElementById('m1');
const m2 = document.getElementById('m2');
const m3 = document.getElementById('m3');
const m4 = document.getElementById('m4');
const m5 = document.getElementById('m5');
const m6 = document.getElementById('m6');
const m7 = document.getElementById('m7');
const m8 = document.getElementById('m8');
const m9 = document.getElementById('m9');
const m10 = document.getElementById('m10');
const m11 = document.getElementById('m11');
const m12 = document.getElementById('m12');
const month_arr = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12];

for(var i=0; i<12; i++){
	(function(m){
		month_arr[m].addEventListener('click', () => {
			for(var j=0; j<8; j++){
				let key_title;
				let key_content;
				if(j<5){
				key_title = 'question'+(j+1)+'_title';
				key_content = 'question'+(j+1)+'_content';
				} else{
				key_title = 'addition'+(j-4)+'_title';
				key_content = 'addition'+(j-4)+'_content';
				}
				title_arr[j].innerHTML = db_obj[m][key_title];
				content_arr[j].innerHTML = db_obj[m][key_content];
			}
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
