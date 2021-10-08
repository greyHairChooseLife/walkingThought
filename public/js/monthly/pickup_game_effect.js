for(var i=0; i<index[5]; i++){
	(function(m){
		card_arr[m].addEventListener('mouseenter', () => {
			card_arr[m].style.opacity = '0.2';
		});
		card_arr[m].addEventListener('mouseleave', ()=> {
			if(card_on_off_arr[m] != 1)
				card_arr[m].style.opacity = '1.0';
		});
	})(i);
}

left.addEventListener('mouseenter', () => {
	left.style.backgroundColor = '#6b9c7e';
	left.style.color = 'black';
	right.style.backgroundColor = 'white';
	right.style.color = 'grey';
});
right.addEventListener('mouseenter', () => {
	right.style.backgroundColor = '#6b9c7e';
	right.style.color = 'black';
	left.style.backgroundColor = 'white';
	left.style.color = 'grey';
});


