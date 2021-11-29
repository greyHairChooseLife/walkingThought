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
	if(page_index < 7)
		page_index++;
	pages.forEach(ele => {ele.style.display = 'none'});
	pages[page_index].style.display = 'block';
	if(page_index == 7)
		next.style.display = 'none';
	if(page_index != 0)
		before.style.display = 'block';
});
before.addEventListener('click', () => {
	if(page_index > 0)
		page_index--;
	pages.forEach(ele => {ele.style.display = 'none'});
	pages[page_index].style.display = 'block';
	if(page_index == 0)
		before.style.display = 'none';
	if(page_index != 7)
		next.style.display = 'block';
});

const answer1 = document.getElementById('answer1');
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
});
answer2_example[1].addEventListener('click', () => {
	answer2.value = '1';
});
answer2_example[2].addEventListener('click', () => {
	answer2.value = '2';
});

const answer3_example = document.getElementsByClassName('answer3');
answer3_example[0].addEventListener('click', () => {
	answer3.value = '0';
});
answer3_example[1].addEventListener('click', () => {
	answer3.value = '1';
});
answer3_example[2].addEventListener('click', () => {
	answer3.value = '2';
});
answer3_example[3].addEventListener('click', () => {
	answer3.value = '3';
});

const answer5_src_hard = document.getElementById('answer5_src_hard');
const answer5_src_diffi = document.getElementById('answer5_src_diffi');
const question5_next_button = document.getElementById('question5_next_button');
question5_next_button.addEventListener('click', () => {
	answer5.value = '힘든점: ' + answer5_src_hard.value + '@@@' + '어려운점: ' + answer5_src_diffi.value;
});

const answer6_example = document.getElementsByClassName('answer6');
answer6_example[0].addEventListener('click', () => {
	answer6.value = '0';
});
answer6_example[1].addEventListener('click', () => {
	answer6.value = '1';
});

const answer7_example = document.getElementsByClassName('answer7');
answer7_example[0].addEventListener('click', () => {
	answer7.value = '0';
});
answer7_example[1].addEventListener('click', () => {
	answer7.value = '1';
});

const answer8_example = document.getElementsByClassName('answer8');
answer8_example[0].addEventListener('click', () => {
	answer8.value = '0';
});
answer8_example[1].addEventListener('click', () => {
	answer8.value = '1';
});
answer8_example[2].addEventListener('click', () => {
	answer8.value = '2';
});


send_survey.addEventListener('click', () => {
	survey_form.submit();
});
