today_button.addEventListener('click', () => {
	navigate_page.action = "/diary/daily/" + user_id + "?year=" + today_index[0] + "&month=" + today_index[1] + "&date=" + today_index[2];
	navigate_page.submit();
});
