const writing_board_wrapper = document.getElementById('writing_board_wrapper');
const start_writing_button = document.getElementById('start_writing_button');
const paragraph_title = document.getElementById('paragraph_title');
const paragraph_content = document.getElementById('paragraph_content');
const writing_board_background = document.getElementById('writing_board_background');

const enlarge_button = document.getElementById('enlarge_button');
const cancel_button = document.getElementById('cancel_button');
const post_diary_button = document.getElementById('post_diary_button');

const enlarged_decrease_button = document.getElementById('enlarged_decrease_button');
const daily_diary = document.getElementById('daily_diary');

const zac = document.getElementsByClassName('zac');

// start writing button
start_writing_button.addEventListener('click', () => {
	start_writing_button.style.display = 'none';
	paragraph_title.style.display = 'block';
	paragraph_content.style.display = 'block';
	enlarge_button.style.display = 'block';
	cancel_button.style.display = 'block';
	post_diary_button.style.display = 'block';
	writing_board_background.style.display = 'block';
})

//cancel_button
cancel_button.addEventListener('click', () => {
	start_writing_button.style.display = 'block';
	paragraph_title.style.display = 'none';
	paragraph_content.style.display = 'none';
	enlarge_button.style.display = 'none';
	cancel_button.style.display = 'none';
	post_diary_button.style.display = 'none';
	writing_board_background.style.display = 'none';
	enlarged_decrease_button.style.display = 'none';
	zac[0].id = "writing_board_wrapper";
	zac[1].id = "writing_board_background";
	zac[2].id = "paragraph_title";
	zac[3].id = "paragraph_content";
	zac[4].id = "cancel_button";
	zac[5].id = "post_diary_button";
})

//enlarge
enlarge_button.addEventListener('click', () => {
	writing_board_wrapper.id = 'enlarged_writing_board_wrapper';
	post_diary_button.id = "enlarged_post_diary_button";
	cancel_button.id = "enlarged_cancel_button";
	writing_board_background.id = "enlarged_writing_board_background";
	paragraph_title.id = "enlarged_paragraph_title";
	paragraph_content.id = "enlarged_paragraph_content";
	enlarged_decrease_button.style.display = 'block';
	enlarge_button.style.display = "none";
})

//decrease
enlarged_decrease_button.addEventListener('click', () => {
	zac[0].id = "writing_board_wrapper";
	zac[1].id = "writing_board_background";
	zac[2].id = "paragraph_title";
	zac[3].id = "paragraph_content";
	zac[4].id = "cancel_button";
	zac[5].id = "post_diary_button";
	enlarged_decrease_button.style.display = 'none';
	enlarge_button.style.display = "block";
})


//submit
post_diary_button.addEventListener('click', () => {
	const final_answer = window.confirm('등록하면 수정, 삭제할수 없습니다.\n등록하시겠습니까?');
	if(final_answer == true)
		daily_diary.submit();
	else
		return;
})


// 보여줄 데이터의 index로 사용되는 쿼리스트링의 날짜와 오늘 날짜를 비교하여 일일일기 작성칸의 위치를 결정한다.
switch (writing_board_index) {
	case 'L1' :
		writing_board_wrapper.style.top = '3%'
		writing_board_wrapper.style.left = '3%'
		break;
	case 'L2' :
		writing_board_wrapper.style.top = '27%'
		writing_board_wrapper.style.left = '3%'
		break;
	case 'L3' :
		writing_board_wrapper.style.top = '51%'
		writing_board_wrapper.style.left = '3%'
		break;
	case 'L4' :
		writing_board_wrapper.style.top = '75%'
		writing_board_wrapper.style.left = '3%'
		break;
	case 'R1' :
		writing_board_wrapper.style.top = '3%'
		writing_board_wrapper.style.left = '46%'
		break;
	case 'R2' :
		writing_board_wrapper.style.top = '27%'
		writing_board_wrapper.style.left = '46%'
		break;
	case 'R3' :
		writing_board_wrapper.style.top = '51%'
		writing_board_wrapper.style.left = '46%'
		break;
	case 'R4' :
		writing_board_wrapper.style.top = '75%'
		writing_board_wrapper.style.left = '46%'
		break;
}

