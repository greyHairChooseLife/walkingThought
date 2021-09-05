function move(selected_direction){
	if(selected_direction == 'up'){
		//navigate_page.action = `/diary/monthly/${user_id}?year=${index_year}&month=${index_month}&date=${index_date}`;   // don't know why it doesn't work
		navigate_page.action = "/diary/monthly/" + user_id + "?year=" + (index_year+1) + "&month=" + index_month + "&date=" + index_date;
		navigate_page.submit();
	}
	else if(selected_direction == 'down'){
		navigate_page.action = "/diary/monthly/" + user_id + "?year=" + (index_year-1) + "&month=" + index_month + "&date=" + index_date;
		navigate_page.submit();
	}
	else if(selected_direction == 'left'){
		if(index_month == 12)	navigate_page.action = "/diary/monthly/" + user_id + "?year=" + (index_year+1) + "&month=" + 1 + "&date=" + index_date;
		else	navigate_page.action = "/diary/monthly/" + user_id + "?year=" + index_year + "&month=" + (index_month+1) + "&date=" + index_date;
		navigate_page.submit();
	}
	else if(selected_direction == 'right'){
		if(index_month == 1)	navigate_page.action = "/diary/monthly/" + user_id + "?year=" + (index_year-1) + "&month=" + 12 + "&date=" + index_date;
		else	navigate_page.action = "/diary/monthly/" + user_id + "?year=" + index_year + "&month=" + (index_month-1) + "&date=" + index_date;
		navigate_page.submit();
	}
};
