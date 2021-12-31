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

const remote_con = document.getElementsByClassName('remote_con');

function switch_remote_con(value){
	if(value == 'show'){
		for(var i=0; i<remote_con.length; i++){
			remote_con[i].style.display = 'block';
		}
	} else if(value == 'hide'){
		for(var i=0; i<remote_con.length; i++){
			remote_con[i].style.display = 'none';
		}
	}
}

// 일기쓰기 버튼을 누른 시간을 기준으로 일기 작성일이 결정될 수 있도록 한다. 
const writing_datetime = document.getElementById('writing_datetime');
function toss_writing_datetime_to_server(){
	let now = new Date();
	if(now.getHours() <= 3)		//일기 작성 시점이 03시 이전이라면 전날 일기라고 봐야한다.  그러니까 날짜에서 하루 빼 준다.
		now.setDate(now.getDate() - 1);
	
	now.setHours(now.getHours() + 9);	//toISOString() 이놈은 utc기준시를 사용하느라고 9시간 전으로 돌려버린다.
	writing_datetime.value = now.toISOString().slice(0, 19).replace('T', ' ');

}



// start writing button
start_writing_button.addEventListener('click', () => {
	start_writing_button.style.display = 'none';
	paragraph_title.style.display = 'block';
	paragraph_title.focus();
	paragraph_content.style.display = 'block';
	enlarge_button.style.display = 'block';
	cancel_button.style.display = 'block';
	post_diary_button.style.display = 'block';
	writing_board_background.style.display = 'block';
	toss_writing_datetime_to_server();
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
	enlarged_paragraph_title.focus();
	paragraph_content.id = "enlarged_paragraph_content";
	enlarged_decrease_button.style.display = 'block';
	enlarge_button.style.display = "none";
	switch_remote_con('hide');
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
	switch_remote_con('show');
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
	case 1 :
		writing_board_wrapper.style.top = '5%'
		break;
	case 2 :
		writing_board_wrapper.style.top = '36%'
		break;
	case 3 :
		writing_board_wrapper.style.top = '67%'
		break;
}

