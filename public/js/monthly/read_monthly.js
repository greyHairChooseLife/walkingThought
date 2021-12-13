// navigate other month or year by Bottons.
const focus_year_index = document.getElementById('focus_year_index');
const focus_month_index = document.getElementById('focus_month_index');
const year_up = document.getElementById('year_up');
const year_down = document.getElementById('year_down');
const month_up = document.getElementById('month_up');
const month_down = document.getElementById('month_down');
const navigator = document.getElementById('navigator');

function show_move_button(key1, key2) {
	if(key1 == 'y' && key2 == 'show'){
		year_up.style.opacity = '1.0';
		year_down.style.opacity = '1.0';
	}
	if(key1 == 'y' && key2 == 'hide'){
		year_up.style.opacity = '0.3';
		year_down.style.opacity = '0.3';
	}
	if(key1 == 'm' && key2 == 'show'){
		month_up.style.opacity = '1.0';
		month_down.style.opacity = '1.0';
	}
	if(key1 == 'm' && key2 == 'hide'){
		month_up.style.opacity = '0.3';
		month_down.style.opacity = '0.3';
	}
};

focus_year_index.addEventListener('mouseenter', () => {
	show_move_button('y', 'show');
});
year_up.addEventListener('mouseenter', () => {
	show_move_button('y', 'show');
});
year_down.addEventListener('mouseenter', () => {
	show_move_button('y', 'show');
});
focus_year_index.addEventListener('mouseleave', () => {
	show_move_button('y', 'hide');
});
year_up.addEventListener('mouseleave', () => {
	show_move_button('y', 'hide');
});
year_down.addEventListener('mouseleave', () => {
	show_move_button('y', 'hide');
});

focus_month_index.addEventListener('mouseenter', () => {
	show_move_button('m', 'show');
});
month_up.addEventListener('mouseenter', () => {
	show_move_button('m', 'show');
});
month_down.addEventListener('mouseenter', () => {
	show_move_button('m', 'show');
});
focus_month_index.addEventListener('mouseleave', () => {
	show_move_button('m', 'hide');
});
month_up.addEventListener('mouseleave', () => {
	show_move_button('m', 'hide');
});
month_down.addEventListener('mouseleave', () => {
	show_move_button('m', 'hide');
});



//spread out data according to the period selection
const diary = document.getElementById('diary');
let tag_maker;

let focused_period = index[1];
let how_many_paragraph = diarys[focused_period-1].question.length;

//월간 생각 작성여부 판단
let is_written = [];
for(var i=0; i<12; i++){
	if(diarys[i].content.length <= 1 && diarys[i].content[0] == '' && diarys[i].coment[0] == '')
		is_written[i] = false;
	else
		is_written[i] = true;
}

focus_year_index.innerText = index[0]+'.';

function navigate_period(focused_period) {
	if(focused_period > 12){
		navigator.action = '/diary/read_monthly?year='+(Number(index[0])+1)+'&month='+1;
		navigator.submit();
	}
	else if(focused_period < 1){
		navigator.action = '/diary/read_monthly?year='+(Number(index[0])-1+'&month='+12);
		navigator.submit();
	}
}

function spread_focused_period(focused_period) {
	if(focused_period < 10)			//initiate period
		focus_month_index.innerText = '0' + Number(focused_period);
	else if(focused_period >= 10)
		focus_month_index.innerText = Number(focused_period);
}

function spread_diary(how_many_paragraph) {
	tag_maker = document.createElement('div');
	tag_maker.setAttribute("id","start_spacer");
	tag_maker.innerHTML = '작성일 : ' + diarys[focused_period-1].created_date.split('T')[0];
	diary.appendChild(tag_maker);
	for(var i=0; i<how_many_paragraph; i++){
		if(is_written[focused_period-1] == false){
			tag_maker = document.createElement('div');
			tag_maker.setAttribute("id","notice_empty");
			tag_maker.innerText = '작성된 내용이 없습니다.';
			diary.appendChild(tag_maker);
		} else{
			if(diarys[focused_period-1].content[i] == ''){
				tag_maker = document.createElement('pre');
				tag_maker.setAttribute("class","new_coment");
				tag_maker.innerText = diarys[focused_period-1].coment[i];
				diary.appendChild(tag_maker);
			} else{
				tag_maker = document.createElement('div');
				tag_maker.setAttribute("class","top_spacer");
				diary.appendChild(tag_maker);

				tag_maker = document.createElement('pre');
				tag_maker.setAttribute("class","pickup_content");
				tag_maker.innerText = diarys[focused_period-1].content[i];
				diary.appendChild(tag_maker);

				tag_maker = document.createElement('pre');
				tag_maker.setAttribute("class","pickup_question");
				tag_maker.innerText = '☞ ' + diarys[focused_period-1].question[i];
				diary.appendChild(tag_maker);

				tag_maker = document.createElement('pre');
				tag_maker.setAttribute("class","pickup_coment");
				tag_maker.innerText = '☞ ' + diarys[focused_period-1].coment[i];
				diary.appendChild(tag_maker);

				tag_maker = document.createElement('div');
				tag_maker.setAttribute("class","bottom_spacer");
				diary.appendChild(tag_maker);
			}
		}
	}
	tag_maker = document.createElement('div');
	tag_maker.setAttribute("id","end_spacer");
	tag_maker.innerHTML = '끝.'
	diary.appendChild(tag_maker);
}
function remove_spreaded() {
	diary.innerHTML = '';
}
spread_focused_period(focused_period);
spread_diary(how_many_paragraph);

month_up.addEventListener('click', () => {
	remove_spreaded();
	focused_period++;
	navigate_period(focused_period);
	spread_focused_period(focused_period);
	how_many_paragraph = diarys[focused_period-1].question.length;
	spread_diary(how_many_paragraph);
});
month_down.addEventListener('click', () => {
	remove_spreaded();
	focused_period--;
	navigate_period(focused_period);
	spread_focused_period(focused_period);
	how_many_paragraph = diarys[focused_period-1].question.length;
	spread_diary(how_many_paragraph);
});
year_up.addEventListener('click', () => {
	navigator.action = '/diary/read_monthly?year='+(Number(index[0])+1)+'&month='+focused_period;
	navigator.submit();
});
year_down.addEventListener('click', () => {
	navigator.action = '/diary/read_monthly?year='+(Number(index[0])-1)+'&month='+focused_period;
	navigator.submit();
});

// about 월별 보기 button 
const move_date_button = document.getElementById('move_date_button');
const monthly_candi = document.getElementById('monthly_candi');
const button0 = document.getElementById('button0');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button5 = document.getElementById('button5');
const button6 = document.getElementById('button6');
const button7 = document.getElementById('button7');
const button8 = document.getElementById('button8');
const button9 = document.getElementById('button9');
const button10 = document.getElementById('button10');
const button11 = document.getElementById('button11');
const buttons_arr = [button0, button1, button2, button3, button4, button5, button6, button7, button8, button9, button10, button11];

move_date_button.addEventListener('click', () => {
	monthly_candi.style.display = 'block';
});

for(var i=0; i<12; i++){
	(function(m){
		buttons_arr[m].addEventListener('click', () => {
			remove_spreaded();
			focused_period = m+1;
			spread_focused_period(focused_period);
			how_many_paragraph = diarys[focused_period-1].content.length;
			spread_diary(how_many_paragraph);
		});
	})(i);
}
for(var i=0; i<12; i++){
	(function(m){
		if(diarys[m].is_written == false){
			buttons_arr[m].style.opacity = '0.2';
		} else
			buttons_arr[m].style.cursor = 'pointer';
	})(i);
}

const today_button = document.getElementById('today_button');

today_button.addEventListener('click', () => {
	navigator.action = '/diary/read_monthly?year='+today_index[0]+'&month='+today_index[1];
	navigator.submit();
});

