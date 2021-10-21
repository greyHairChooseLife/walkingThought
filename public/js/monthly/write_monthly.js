const writing_board = document.getElementById('writing_board');
const add_more = document.getElementById('add_more');
const add_more_new = document.getElementById('add_more_new');
const add_more_old = document.getElementById('add_more_old');
const pickup_list_container = document.getElementById('pickup_list_container');
const diary_submit = document.getElementById('submit_button');

const question0 = document.getElementById('question0');
const question1 = document.getElementById('question1');
const question2 = document.getElementById('question2');
const question3 = document.getElementById('question3');
const question4 = document.getElementById('question4');
const pickup_arr = [question0, question1, question2, question3, question4]
let counter_pickup_arr = 5;


let number_of_paragraph = 0;
let type_of_paragraph;

let tag_maker;


add_more_new.addEventListener('click', () => {
	type_of_paragraph = 'addtion';
	tag_maker = document.createElement('textarea');
	tag_maker.setAttribute("class", "new_paragraph_coment");
	tag_maker.setAttribute("id", "new_paragraph_coment_"+number_of_paragraph);
	tag_maker.setAttribute("onkeydown", "resize(this)");
	tag_maker.setAttribute("name", "coments");
	tag_maker.setAttribute("placeholder", "떠오르는 생각들, 맴도는 생각들을 자유롭게 써 보세요.");
	writing_board.appendChild(tag_maker);

	tag_maker = document.createElement('input');
	tag_maker.setAttribute("type", "hidden");
	tag_maker.setAttribute("name", "titles");
	tag_maker.setAttribute("value", "");
	writing_board.appendChild(tag_maker);

	tag_maker = document.createElement('input');
	tag_maker.setAttribute("type", "hidden");
	tag_maker.setAttribute("name", "contents");
	tag_maker.setAttribute("value", "");
	writing_board.appendChild(tag_maker);

	document.getElementById('new_paragraph_coment_'+number_of_paragraph).focus();

	number_of_paragraph++;
});

add_more_old.addEventListener('click', () => {
	if(counter_pickup_arr > 0){
		pickup_list_container.style.display = 'block';
		add_more_old.innerHTML = '가져온 일간 생각에,<p class="big_word">덧붙이기(' + (counter_pickup_arr-1) +  ')</p>'
	} 
})
add_more_old.addEventListener('mouseenter', () => {
	if(counter_pickup_arr == 0){
		add_more_old.style.cursor = 'not-allowed';
	}
})

function resize(obj){
	obj.style.height = '1px';
	obj.style.height = (50 + obj.scrollHeight) + 'px';
}

for(var i=0; i<pickup_list.length; i++){
	(function(m){
		pickup_arr[m].addEventListener('click', () => {
			type_of_paragraph = 'pickup';
			tag_maker = document.createElement('pre');
			tag_maker.setAttribute("class", "pickup_paragraph_content");
			tag_maker.setAttribute("id", "pickup_paragraph_content_"+number_of_paragraph);
			tag_maker.innerHTML = pickup_list[m][0].content;
			writing_board.appendChild(tag_maker);

			tag_maker = document.createElement('pre');
			tag_maker.setAttribute("class", "pickup_paragraph_title");
			tag_maker.setAttribute("id", "pickup_paragraph_title_"+number_of_paragraph);
			tag_maker.innerHTML = '☞ ' + pickup_list[m][0].question;
			writing_board.appendChild(tag_maker);

			tag_maker = document.createElement('pre');
			tag_maker.setAttribute("class", "pickup_paragraph_date");
			tag_maker.setAttribute("id", "pickup_paragraph_date_"+number_of_paragraph);
			let date_ = pickup_list[m][0].created_date.split('T');
			tag_maker.innerHTML = date_[0];
			writing_board.appendChild(tag_maker);

			tag_maker = document.createElement('textarea');
			tag_maker.setAttribute("class", "pickup_paragraph_coment");
			tag_maker.setAttribute("id", "pickup_paragraph_coment_"+number_of_paragraph);
			tag_maker.setAttribute("onkeydown", "resize(this)");
			tag_maker.setAttribute("name", "coments");
			tag_maker.setAttribute("placeholder", "지금 읽어보기엔 어떤가요? 여전한가요, 달리 보이나요?");
			writing_board.appendChild(tag_maker);

			tag_maker = document.createElement('input');
			tag_maker.setAttribute("type", "hidden");
			tag_maker.setAttribute("name", "titles");
			tag_maker.setAttribute("value", pickup_list[m][0].question);
			writing_board.appendChild(tag_maker);


			tag_maker = document.createElement('input');
			tag_maker.setAttribute("type", "hidden");
			tag_maker.setAttribute("name", "contents");
			tag_maker.setAttribute("value", pickup_list[m][0].content);
			writing_board.appendChild(tag_maker);

			document.getElementById('pickup_paragraph_coment_'+number_of_paragraph).focus();

			pickup_arr[m].remove();
			counter_pickup_arr--;
			number_of_paragraph++;
			pickup_list_container.style.display = 'none';
				
		});
	})(i);
}



diary_submit.addEventListener('click', () => {
	const final_answer = window.confirm('등록하면 수정, 삭제할수 없습니다.\n등록하시겠습니까?');
	if(final_answer == true)
		writing_board.submit();
	else
		return;
});
