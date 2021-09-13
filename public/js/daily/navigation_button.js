today_button.addEventListener("click", function(){
	const plus_month = new Date().getMonth() + 1;
	navigate_page.action = "/diary/daily/" + user_id + "?year=" + new Date().getFullYear() + "&month=" + plus_month + "&date=" + new Date().getDate();
	navigate_page.submit();
});
monthly_button.addEventListener("click", function(){
	navigate_page.action = "/diary/monthly/" + user_id + "?year=" + index_year + "&month=" + index_month + "&date=" + index_date;
	navigate_page.submit();
});
