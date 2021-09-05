up_button.addEventListener("click", function(){
	selected_direction = 'down';
	move(selected_direction);
});
down_button.addEventListener("click", function(){
	selected_direction = 'up';
	move(selected_direction);
});
left_button.addEventListener("click", function(){
	selected_direction = 'right';
	move(selected_direction);
});
right_button.addEventListener("click", function(){
	selected_direction = 'left';
	move(selected_direction);
});
today_button.addEventListener("click", function(){
	const plus_month = new Date().getMonth() + 1;
	navigate_page.action = "/diary/monthly/" + user_id + "?year=" + new Date().getFullYear() + "&month=" + plus_month + "&date=" + new Date().getDate();
	navigate_page.submit();
});
daily_button.addEventListener("click", function(){
	navigate_page.action = "/diary/daily/" + user_id + "?year=" + index_year + "&month=" + index_month + "&date=" + index_date;
	navigate_page.submit();
});
