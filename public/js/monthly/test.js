const calendar_cards_array = [];
for(var i=0; i<index[5]; i++){
calendar_cards_array.push(document.getElementById(`calendar_card_${i+1}`));
}

function show_card(i){
	document.getElementById('read_question').innerHTML = calendar_data[i].question;
	document.getElementById('read_content').innerHTML = calendar_data[i].content;
}

for(var i=0; i<index[5]; i++){
	//this is JS Closure. let's study!!
	(function(m){
		calendar_cards_array[m].addEventListener('mouseenter', function(){
			show_card(m);
			document.getElementById('read').style.display = 'block';
		});
	})(i);
}

document.getElementById('calendar_board').addEventListener('mouseleave', () => {
	document.getElementById('read').style.display = 'none';

});
