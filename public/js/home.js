const clicked_login = document.getElementsByClassName('clicked_login');
const clicked_register = document.getElementsByClassName('clicked_register');

//login
const login_board = document.getElementById('login_board');
const login_button = document.getElementById('login_button');
const login_cancel = document.getElementById('login_cancel');
const login_email = document.getElementById('login_email');

if(isLogin === false){
	login_button.addEventListener('click', () => {
		for(var i=0; i<clicked_login.length; i++){
			clicked_login[i].style.opacity = '15%';
		}
		login_board.style.display = 'block';
		login_email.focus();
	});

	login_cancel.addEventListener('click', () => {
		for(var i=0; i<clicked_login.length; i++){
			clicked_login[i].style.opacity = '';
		}
		login_board.style.display = 'none';
	});
}

//register
const regi_board = document.getElementById('regi_board');
const regi_button = document.getElementById('register_button');
const regi_cancel = document.getElementById('regi_cancel');
const regi_nickname = document.getElementById('regi_nickname');

if(isLogin === false){
	regi_button.addEventListener('click', () => {
		for(var i=0; i<clicked_register.length; i++){
			clicked_register[i].style.opacity = '0';
		}
		regi_board.style.display = 'block';
		regi_nickname.focus();
	});

	regi_cancel.addEventListener('click', () => {
		for(var i=0; i<clicked_register.length; i++){
			clicked_register[i].style.opacity = '100%';
		}
		regi_board.style.display = 'none';
	});
}

const regi_sex_m = document.getElementById('regi_sex_m');
const regi_sex_f = document.getElementById('regi_sex_f');
const regi_sex = document.getElementById('regi_sex');

if(isLogin === false){
	regi_sex_m.addEventListener('click', () => {
		regi_sex_m.style.color = "#59886B";
		regi_sex_m.style.backgroundColor = "white";
		regi_sex_m.style.opacity = "100%";
		regi_sex_f.style.color = "white";
		regi_sex_f.style.backgroundColor = "#59886B";
		regi_sex_f.style.opacity = "70%";
		regi_sex.value = "M";
	});
	regi_sex_f.addEventListener('click', () => {
		regi_sex_f.style.color = "#59886B";
		regi_sex_f.style.backgroundColor = "white";
		regi_sex_f.style.opacity = "100%";
		regi_sex_m.style.color = "white";
		regi_sex_m.style.backgroundColor = "#59886B";
		regi_sex_m.style.opacity = "70%";
		regi_sex.value = "F";
	});
}


// check login status to show or hide.
const catchphrase_board = document.getElementById('catchphrase_board');
const introduction = document.getElementById('introduction');
const after_login = document.getElementsByClassName('after_login');

if(isLogin === true){
	catchphrase_board.style.display = 'none';
	introduction.style.display = 'none';
	for(var i=0; i<after_login.length; i++){
		after_login[i].style.display = 'block';
	}
} else{
	catchphrase_board.style.display = 'block';
	introduction.style.display = 'block';
	for(var i=0; i<after_login.length; i++){
		after_login[i].style.display = 'none';
	}
}


// during logged in, variety effects caused by mouse hover over whatever
const written_already_alert = document.getElementById('written_already_alert');
const monthly_write_alert = document.getElementById('monthly_write_alert');
const annually_write_alert = document.getElementById('annually_write_alert');

const daily_read_write_form = document.getElementById('daily_read_write_form');
const monthly_read_form = document.getElementById('monthly_read_form');
const monthly_write_form = document.getElementById('monthly_write_form');
const annually_read_form = document.getElementById('annually_read_form');
const annually_write_form = document.getElementById('annually_write_form');

const section_indi = document.getElementById('section_indicator');
const sub_indi_1 = document.getElementById('sub_indicator_1');
const sub_indi_2 = document.getElementById('sub_indicator_2');
const sub_indi_3 = document.getElementById('sub_indicator_3');
const sub_indi_4 = document.getElementById('sub_indicator_4');
const sub_indi_5 = document.getElementById('sub_indicator_5');
const sub_indi_arr = [sub_indi_1, sub_indi_2, sub_indi_3, sub_indi_4, sub_indi_5];

const section_selec_1 = document.getElementById('section_selector_1');
const section_selec_2 = document.getElementById('section_selector_2');
const section_selec_3 = document.getElementById('section_selector_3');
const sub_selec_1 = document.getElementById('sub_selector_1');
const sub_selec_2 = document.getElementById('sub_selector_2');
const sub_selec_3 = document.getElementById('sub_selector_3');
const sub_selec_4 = document.getElementById('sub_selector_4');
const sub_selec_5 = document.getElementById('sub_selector_5');
const select_day = document.getElementsByClassName('select_day');
const select_month = document.getElementsByClassName('select_month');
const select_year = document.getElementsByClassName('select_year');

const daily_read_write_button = document.getElementById('daily_read_write_button');
const monthly_read_button = document.getElementById('monthly_read_button');
const monthly_write_button = document.getElementById('monthly_write_button');
const annually_read_button = document.getElementById('annually_read_button');
const annually_write_button = document.getElementById('annually_write_button');

section_selec_1.addEventListener('mouseenter', () => {
	section_indi.style.display = 'block';
	section_indi.style.left = '11%';
	for(var i=0; i<select_year.length; i++){
		select_year[i].style.opacity = '';
	}
	for(var i=0; i<select_month.length; i++){
		select_month[i].style.opacity = '';
	}
	for(var i=0; i<select_day.length; i++){
		select_day[i].style.opacity = '20%';
	}
});
section_selec_2.addEventListener('mouseenter', () => {
	section_indi.style.display = 'block';
	section_indi.style.left = '39%';
	for(var i=0; i<select_day.length; i++){
		select_day[i].style.opacity = '';
	}
	for(var i=0; i<select_year.length; i++){
		select_year[i].style.opacity = '';
	}
	for(var i=0; i<select_month.length; i++){
		select_month[i].style.opacity = '20%';
	}
});
section_selec_3.addEventListener('mouseenter', () => {
	section_indi.style.display = 'block';
	section_indi.style.left = '65.5%';
	for(var i=0; i<select_month.length; i++){
		select_month[i].style.opacity = '';
	}
	for(var i=0; i<select_day.length; i++){
		select_day[i].style.opacity = '';
	}
	for(var i=0; i<select_year.length; i++){
		select_year[i].style.opacity = '20%';
	}
});

sub_selec_1.addEventListener('mouseenter', () => {
	section_indi.style.display = 'block';
	section_indi.style.left = '11%';
	for(var i=0; i<sub_indi_arr.length; i++){
		sub_indi_arr[i].style.display = 'none';
	}
	for(var i=0; i<select_year.length; i++){
		select_year[i].style.opacity = '';
	}
	for(var i=0; i<select_month.length; i++){
		select_month[i].style.opacity = '';
	}
	for(var i=0; i<select_day.length; i++){
		select_day[i].style.opacity = '20%';
	}
	sub_indi_1.style.display = 'block';
});
sub_selec_1.addEventListener('click', () => {
	daily_read_write_form.submit();
});
sub_selec_2.addEventListener('mouseenter', () => {
	section_indi.style.display = 'block';
	section_indi.style.left = '39%';
	for(var i=0; i<sub_indi_arr.length; i++){
		sub_indi_arr[i].style.display = 'none';
	}
	for(var i=0; i<select_day.length; i++){
		select_day[i].style.opacity = '';
	}
	for(var i=0; i<select_year.length; i++){
		select_year[i].style.opacity = '';
	}
	for(var i=0; i<select_month.length; i++){
		select_month[i].style.opacity = '20%';
	}
	sub_indi_2.style.display = 'block';
});
sub_selec_2.addEventListener('click', () => {
	monthly_read_form.action = '/diary/read_monthly?year='+index_year+'&month='+index_month;
	monthly_read_form.submit();
});
sub_selec_3.addEventListener('mouseenter', () => {
	section_indi.style.display = 'block';
	section_indi.style.left = '39%';
	for(var i=0; i<sub_indi_arr.length; i++){
		sub_indi_arr[i].style.display = 'none';
	}
	for(var i=0; i<select_day.length; i++){
		select_day[i].style.opacity = '';
	}
	for(var i=0; i<select_year.length; i++){
		select_year[i].style.opacity = '';
	}
	for(var i=0; i<select_month.length; i++){
		select_month[i].style.opacity = '20%';
	}
	sub_indi_3.style.display = 'block';
	if(monthly_write_period == false)
		monthly_write_alert.style.display = "block"

	if(is_monthly_written == true){
		written_already_alert.style.display = 'block';
			//callback function to let user know he already wrote it.
		}
});
sub_selec_3.addEventListener('mouseleave', () => {
	monthly_write_alert.style.display = "none"
	written_already_alert.style.display = 'none';
});
sub_selec_3.addEventListener('click', () => {
	if(monthly_write_period == true && is_monthly_written == false){
		monthly_write_form.submit();
	} 
});
sub_selec_4.addEventListener('mouseenter', () => {
	section_indi.style.display = 'block';
	section_indi.style.left = '65.5%';
	for(var i=0; i<sub_indi_arr.length; i++){
		sub_indi_arr[i].style.display = 'none';
	}
	for(var i=0; i<select_month.length; i++){
		select_month[i].style.opacity = '';
	}
	for(var i=0; i<select_day.length; i++){
		select_day[i].style.opacity = '';
	}
	for(var i=0; i<select_year.length; i++){
		select_year[i].style.opacity = '20%';
	}
	sub_indi_4.style.display = 'block';
});
sub_selec_4.addEventListener('click', () => {
	annually_read_form.submit();
});
sub_selec_5.addEventListener('mouseenter', () => {
	section_indi.style.display = 'block';
	section_indi.style.left = '65.5%';
	for(var i=0; i<sub_indi_arr.length; i++){
		sub_indi_arr[i].style.display = 'none';
	}
	for(var i=0; i<select_month.length; i++){
		select_month[i].style.opacity = '';
	}
	for(var i=0; i<select_day.length; i++){
		select_day[i].style.opacity = '';
	}
	for(var i=0; i<select_year.length; i++){
		select_year[i].style.opacity = '20%';
	}
	sub_indi_5.style.display = 'block';
	if(annually_write_period == false)
		annually_write_alert.style.display = 'block';
});
sub_selec_5.addEventListener('mouseleave', () => {
	annually_write_alert.style.display = 'none';
});
sub_selec_5.addEventListener('click', () => {
	if(annually_write_period == true)
		annually_write_form.submit();
});


