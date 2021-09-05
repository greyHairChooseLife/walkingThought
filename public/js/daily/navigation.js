const this_month_last_date = new Date(index_year, index_month, 0).getDate();
const last_month_last_date = new Date(index_year, index_month-1, 0).getDate();


function move(selected_direction){
	if(selected_direction == 'up'){
		//navigate_page.action = `/diary/daily/${user_id}?year=${index_year}&month=${index_month}&date=${index_date}`;   // don't know why it doesn't work
		navigate_page.action = "/diary/daily/" + user_id + "?year=" + (index_year+1) + "&month=" + index_month + "&date=" + index_date;
		navigate_page.submit();
	}
	else if(selected_direction == 'down'){
		navigate_page.action = "/diary/daily/" + user_id + "?year=" + (index_year-1) + "&month=" + index_month + "&date=" + index_date;
		navigate_page.submit();
	}
	else if(selected_direction == 'left'){
		if(index_date == this_month_last_date && index_month != 12)
			navigate_page.action = "/diary/daily/" + user_id + "?year=" + index_year + "&month=" + (index_month+1) + "&date=" + 1;
		else if(index_date == this_month_last_date && index_month === 12)
			navigate_page.action = "/diary/daily/" + user_id + "?year=" + (index_year+1) + "&month=" + 1 + "&date=" + 1;
		else
			navigate_page.action = "/diary/daily/" + user_id + "?year=" + index_year + "&month=" + index_month + "&date=" + (index_date+1);
		navigate_page.submit();
	}
	else if(selected_direction == 'right'){
		if(index_date === 1 && index_month != 1)
			navigate_page.action = "/diary/daily/" + user_id + "?year=" + index_year + "&month=" + (index_month-1) + "&date=" + last_month_last_date;
		else if(index_date === 1 && index_month === 1)
			navigate_page.action = "/diary/daily/" + user_id + "?year=" + (index_year-1) + "&month=" + 12 + "&date=" + last_month_last_date;
		else
			navigate_page.action = "/diary/daily/" + user_id + "?year=" + index_year + "&month=" + index_month + "&date=" + (index_date-1);
		navigate_page.submit();
	}
};
