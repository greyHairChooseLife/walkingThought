const writing_board = document.getElementById('writing_board');
const add_more = document.getElementById('add_more');
const add_more_new = document.getElementById('add_more_new');
const add_more_old = document.getElementById('add_more_old');
const pickup_list_container = document.getElementById('pickup_list_container');
const diary_submit = document.getElementById('diary_submit');

const question0 = document.getElementById('question0');
const question1 = document.getElementById('question1');
const question2 = document.getElementById('question2');
const question3 = document.getElementById('question3');
const question4 = document.getElementById('question4');
const pickup_arr = [question0, question1, question2, question3, question4]
let counter_pickup_arr = 5;


let number_of_paragraph = 0;
let type_of_paragraph;
let tag_title;
let tag_textarea;
let tag_hidden;


add_more_new.addEventListener('click', () => {
	type_of_paragraph = 'addtion';
	if(number_of_paragraph < 8){
		tag_title = document.createElement('input');
		tag_title.setAttribute("class", "paragraph_title");
		tag_title.setAttribute("id", "paragraph_title_"+number_of_paragraph);
		tag_title.setAttribute("type", "text");
		tag_title.setAttribute("name", "titles");
		tag_title.setAttribute("placeholder", "제목을 입력하십시오.");

		tag_textarea = document.createElement('textarea');
		tag_textarea.setAttribute("class", "paragraph_content");
		tag_textarea.setAttribute("id", "paragraph_content_"+number_of_paragraph);
		tag_textarea.setAttribute("name", "contents");
		tag_textarea.setAttribute("placeholder", "내용을 입력하세요.");
		tag_textarea.setAttribute("cols", "68");
		tag_textarea.setAttribute("rows", "5");

		writing_board.appendChild(tag_title);
		writing_board.appendChild(tag_textarea);

		document.getElementById('paragraph_title_'+number_of_paragraph).focus();
//		document.getElementById('paragraph_title_'+number_of_paragraph).addEventListener('click', () => {
//			pickup_list_container.style.display = 'block';
//			pickup_list_container.style.right = "5%";
//			pickup_list_container.style.top = "5%";
//		});
		switch(number_of_paragraph){
			case 0:
				add_more.style.left = "5%";
				add_more.style.top = "29%";
				break;
			case 1:
				add_more.style.left = "5%";
				add_more.style.top = "53%";
				break;
			case 2:
				add_more.style.left = "5%";
				add_more.style.top = "77%";
				break;
			case 3:
				add_more.style.left = "47%";
				add_more.style.top = "5%";
				break;
			case 4:
				add_more.style.left = "47%";
				add_more.style.top = "29%";
				break;
			case 5:
				add_more.style.left = "47%";
				add_more.style.top = "53%";
				break;
			case 6:
				add_more.style.left = "47%";
				add_more.style.top = "77%";
				break;
		}

		number_of_paragraph++;
	}
	if(number_of_paragraph == 8){
		add_more.style.display = "none";
	}
});

add_more_old.addEventListener('click', () => {
	if(counter_pickup_arr > 0){
		pickup_list_container.style.display = 'block';
		add_more_old.innerHTML = '가져온 질문들(' + (counter_pickup_arr-1) + ')';
	}
})

add_more_new.addEventListener('mouseenter', () => {
	add_more_new.style.backgroundColor = 'rgba(89, 136, 107, 0.2)';
})
add_more_new.addEventListener('mouseleave', () => {
	add_more_new.style.backgroundColor = 'transparent';
})
add_more_old.addEventListener('mouseenter', () => {
	add_more_old.style.backgroundColor = 'rgba(89, 136, 107, 0.2)';
})
add_more_old.addEventListener('mouseleave', () => {
	add_more_old.style.backgroundColor = 'transparent';
})


for(var i=0; i<pickup_list.length; i++){
	(function(m){
		pickup_arr[m].addEventListener('click', () => {
			type_of_paragraph = 'pickup';
			if(number_of_paragraph < 8){
				tag_title = document.createElement('div');
				tag_title.setAttribute("class", "paragraph_title");
				tag_title.setAttribute("id", "paragraph_title_"+number_of_paragraph);
				tag_title.innerHTML = pickup_list[m][0].question;

				tag_textarea = document.createElement('textarea');
				tag_textarea.setAttribute("class", "paragraph_content");
				tag_textarea.setAttribute("id", "paragraph_content_"+number_of_paragraph);
				tag_textarea.setAttribute("name", "contents");
				tag_textarea.setAttribute("placeholder", "내용을 입력하세요.");
				tag_textarea.setAttribute("cols", "68");
				tag_textarea.setAttribute("rows", "5");

				tag_hidden = document.createElement('input');
				tag_hidden.setAttribute("type", "hidden");
				tag_hidden.setAttribute("name", "titles");
				tag_hidden.setAttribute("value", pickup_list[m][0].question);

				writing_board.appendChild(tag_title);
				writing_board.appendChild(tag_textarea);
				writing_board.appendChild(tag_hidden);
				document.getElementById('paragraph_content_'+number_of_paragraph).focus();

				switch(number_of_paragraph){
					case 0:
						add_more.style.left = "5%";
						add_more.style.top = "29%";
						break;
					case 1:
						add_more.style.left = "5%";
						add_more.style.top = "53%";
						break;
					case 2:
						add_more.style.left = "5%";
						add_more.style.top = "77%";
						break;
					case 3:
						add_more.style.left = "47%";
						add_more.style.top = "5%";
						break;
					case 4:
						add_more.style.left = "47%";
						add_more.style.top = "29%";
						break;
					case 5:
						add_more.style.left = "47%";
						add_more.style.top = "53%";
						break;
					case 6:
						add_more.style.left = "47%";
						add_more.style.top = "77%";
						break;
				}
				pickup_arr[m].remove();
				counter_pickup_arr--;
				number_of_paragraph++;
				pickup_list_container.style.display = 'none';
				
			}
			if(number_of_paragraph == 8){
				add_more.style.display = "none";
			}
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
