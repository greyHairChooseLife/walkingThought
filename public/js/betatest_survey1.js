const survey_form = document.getElementById('survey_form');
const send_survey = document.getElementById('send_survey');

const pages = Array.from(document.getElementsByClassName('page'));

pages.forEach(ele => {
	ele.style.display = 'none'
});
pages[0].style.display = 'block';

const next = document.getElementById('next'); 
const before = document.getElementById('before'); 
before.style.display = 'none';

// move between questions
let page_index = 0;
next.addEventListener('click', () => {
	if(page_index < 6){
		page_index++;
		send_survey.style.backgroundColor = 'transparent';
		send_survey.style.cursor = 'default';
	}
	pages.forEach(ele => {ele.style.display = 'none'});
	pages[page_index].style.display = 'block';
	if(page_index == 6){
		next.style.display = 'none';
		send_survey.style.backgroundColor = 'skyblue';
		send_survey.style.cursor = 'pointer';
	}
	if(page_index != 0)
		before.style.display = 'block';
	switch(page_index){
		case 0:
			send_survey.innerText = '1/7';
			break;
		case 1:
			send_survey.innerText = '2/7';
			break;
		case 2:
			send_survey.innerText = '3/7';
			break;
		case 3:
			send_survey.innerText = '4/7';
			break;
		case 4:
			send_survey.innerText = '5/7';
			break;
		case 5:
			send_survey.innerText = '6/7';
			break;
		case 6:
			send_survey.innerText = '끝, 제출하기';
			break;
	}
});
before.addEventListener('click', () => {
	if(page_index > 0){
		page_index--;
		send_survey.style.backgroundColor = 'transparent';
		send_survey.style.cursor = 'default';
	}
	pages.forEach(ele => {ele.style.display = 'none'});
	pages[page_index].style.display = 'block';
	if(page_index == 0)
		before.style.display = 'none';
	if(page_index != 6)
		next.style.display = 'block';
	switch(page_index){
		case 0:
			send_survey.innerText = '1/7';
			break;
		case 1:
			send_survey.innerText = '2/7';
			break;
		case 2:
			send_survey.innerText = '3/7';
			break;
		case 3:
			send_survey.innerText = '4/7';
			break;
		case 4:
			send_survey.innerText = '5/7';
			break;
		case 5:
			send_survey.innerText = '6/7';
			break;
		case 6:
			send_survey.innerText = '끝, 제출하기';
			break;
	}
});

const answer1 = document.getElementById('answer1');
const show_length = document.getElementById('show_length');
answer1.addEventListener('keyup', () => {
	show_length.innerText = answer1.value.length;
	if(answer1.value.length > 250){
		alert('글자 수 초과에요!');
		answer1.value = answer1.value.substring(0, 250);
	}
})

const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const answer5 = document.getElementById('answer5');
const answer6 = document.getElementById('answer6');
const answer7 = document.getElementById('answer7');
const answer8 = document.getElementById('answer8');

const answer2_example = document.getElementsByClassName('answer2');
answer2_example[0].addEventListener('click', () => {
	answer2.value = '0';
	answer2_example[0].style.backgroundColor = 'white';
	answer2_example[1].style.backgroundColor = 'transparent';
	answer2_example[2].style.backgroundColor = 'transparent';
});
answer2_example[1].addEventListener('click', () => {
	answer2.value = '1';
	answer2_example[0].style.backgroundColor = 'transparent';
	answer2_example[1].style.backgroundColor = 'white';
	answer2_example[2].style.backgroundColor = 'transparent';
});
answer2_example[2].addEventListener('click', () => {
	answer2.value = '2';
	answer2_example[0].style.backgroundColor = 'transparent';
	answer2_example[1].style.backgroundColor = 'transparent';
	answer2_example[2].style.backgroundColor = 'white';
});

const answer3_example = document.getElementsByClassName('answer3');
const list_question4 = Array.from(document.getElementsByClassName('question4'));
list_question4.forEach(e => e.style.display = 'none');
answer4.style.display ='none';
answer3_example[0].addEventListener('click', () => {
	answer3.value = '0';
	answer3_example[0].style.backgroundColor = 'white';
	answer3_example[1].style.backgroundColor = 'transparent';
	answer3_example[2].style.backgroundColor = 'transparent';
	answer3_example[3].style.backgroundColor = 'transparent';
	list_question4.forEach(e => e.style.display = 'none');
	list_question4[0].style.display = 'block';
	answer4.style.display ='block';
	answer4.value ='';
});
answer3_example[1].addEventListener('click', () => {
	answer3.value = '1';
	answer3_example[0].style.backgroundColor = 'transparent';
	answer3_example[1].style.backgroundColor = 'white';
	answer3_example[2].style.backgroundColor = 'transparent';
	answer3_example[3].style.backgroundColor = 'transparent';
	list_question4.forEach(e => e.style.display = 'none');
	list_question4[1].style.display = 'block';
	answer4.style.display ='block';
	answer4.value ='';
});
answer3_example[2].addEventListener('click', () => {
	answer3.value = '2';
	answer3_example[0].style.backgroundColor = 'transparent';
	answer3_example[1].style.backgroundColor = 'transparent';
	answer3_example[2].style.backgroundColor = 'white';
	answer3_example[3].style.backgroundColor = 'transparent';
	list_question4.forEach(e => e.style.display = 'none');
	list_question4[2].style.display = 'block';
	answer4.style.display ='block';
	answer4.value ='';
});
answer3_example[3].addEventListener('click', () => {
	answer3.value = '3';
	answer3_example[0].style.backgroundColor = 'transparent';
	answer3_example[1].style.backgroundColor = 'transparent';
	answer3_example[2].style.backgroundColor = 'transparent';
	answer3_example[3].style.backgroundColor = 'white';
	list_question4.forEach(e => e.style.display = 'none');
	answer4.style.display ='none';
	answer4.value ='ok';
});

const answer5_src_hard = document.getElementById('answer5_src_hard');
const answer5_src_diffi = document.getElementById('answer5_src_diffi');
answer5_src_diffi.addEventListener('keyup', () => {
	answer5.value = '힘든점: ' + answer5_src_hard.value + '@@@' + '어려운점: ' + answer5_src_diffi.value;
})
answer5_src_hard.addEventListener('keyup', () => {
	answer5.value = '힘든점: ' + answer5_src_hard.value + '@@@' + '어려운점: ' + answer5_src_diffi.value;
})

const answer6_example = document.getElementsByClassName('answer6');
answer6_example[0].addEventListener('click', () => {
	answer6.value = '0';
	answer6_example[0].style.backgroundColor = 'white';
	answer6_example[1].style.backgroundColor = 'transparent';
});
answer6_example[1].addEventListener('click', () => {
	answer6.value = '1';
	answer6_example[0].style.backgroundColor = 'transparent';
	answer6_example[1].style.backgroundColor = 'white';
});

const answer7_example = document.getElementsByClassName('answer7');
answer7_example[0].addEventListener('click', () => {
	answer7.value = '0';
	answer7_example[0].style.backgroundColor = 'white';
	answer7_example[1].style.backgroundColor = 'transparent';
});
answer7_example[1].addEventListener('click', () => {
	answer7.value = '1';
	answer7_example[0].style.backgroundColor = 'transparent';
	answer7_example[1].style.backgroundColor = 'white';
});

const answer8_example = document.getElementsByClassName('answer8');
answer8_example[0].addEventListener('click', () => {
	answer8.value = '0';
	answer8_example[0].style.backgroundColor = 'white';
	answer8_example[1].style.backgroundColor = 'transparent';
	answer8_example[2].style.backgroundColor = 'transparent';
});
answer8_example[1].addEventListener('click', () => {
	answer8.value = '1';
	answer8_example[0].style.backgroundColor = 'transparent';
	answer8_example[1].style.backgroundColor = 'white';
	answer8_example[2].style.backgroundColor = 'transparent';
});
answer8_example[2].addEventListener('click', () => {
	answer8.value = '2';
	answer8_example[0].style.backgroundColor = 'transparent';
	answer8_example[1].style.backgroundColor = 'transparent';
	answer8_example[2].style.backgroundColor = 'white';
});


send_survey.addEventListener('click', () => {
	alert('send!!');
	//survey_form.submit();
});
