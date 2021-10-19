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
let p_question;
let p_content;

let focused_period = index[2];
let how_many_paragraph = db_obj[focused_period-1].question.length;

focus_year_index.innerText = index[1]+'.';

function navigate_period(focused_period) {
	if(focused_period > 12){
		navigator.action = '/diary/read_monthly?year='+(Number(index[1])+1)+'&month='+1;
		navigator.submit();
	}
	else if(focused_period < 1){
		navigator.action = '/diary/read_monthly?year='+(Number(index[1])-1+'&month='+12);
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
	for(var i=0; i<how_many_paragraph; i++){
		p_question = document.createElement('div');
		p_question.setAttribute("id","q"+i);
		p_question.setAttribute("class","p_question");
		p_question.innerText = db_obj[focused_period-1].question[i];

		p_content = document.createElement('div');
		p_content.setAttribute("id","c"+i);
		p_content.setAttribute("class","p_content");
		p_content.innerText = db_obj[focused_period-1].content[i];

		diary.appendChild(p_content);
		diary.appendChild(p_question);
	}
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
	how_many_paragraph = db_obj[focused_period-1].question.length;
	spread_diary(how_many_paragraph);
});
month_down.addEventListener('click', () => {
	remove_spreaded();
	focused_period--;
	navigate_period(focused_period);
	spread_focused_period(focused_period);
	how_many_paragraph = db_obj[focused_period-1].question.length;
	spread_diary(how_many_paragraph);
});
year_up.addEventListener('click', () => {
	navigator.action = '/diary/read_monthly?year='+(Number(index[1])+1)+'&month='+focused_period;
	navigator.submit();
});
year_down.addEventListener('click', () => {
	navigator.action = '/diary/read_monthly?year='+(Number(index[1])-1)+'&month='+focused_period;
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
			how_many_paragraph = db_obj[focused_period-1].question.length;
			spread_diary(how_many_paragraph);
		});
	})(i);
}
for(var i=0; i<12; i++){
	(function(m){
		if(db_obj[m].forgot == true){
			buttons_arr[m].style.opacity = '0.2';
		}
	})(i);
}

const today_button = document.getElementById('today_button');

today_button.addEventListener('click', () => {
	navigator.action = '/diary/read_monthly?year='+today_index[0]+'&month='+today_index[1];
	navigator.submit();
});

