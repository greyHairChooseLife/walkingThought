//test
writing_form.addEventListener('mouseenter', ()=> {
	writing_form.style.backgroundColor = 'black';
});


//make things float
var offset = [0,0];

var isDown = false;

writing_form.addEventListener('mousedown', function(e) {
	isDown = true;
	offset = [
		writing_form.offsetLeft - e.clientX,
		writing_form.offsetTop - e.clientY
	 ];
}, true);

document.addEventListener('mouseup', function() {
   isDown = false;
}, true);

document.addEventListener('mousemove', function(e) {
	e.preventDefault();
	if (isDown) {
		writing_form.style.left = (e.clientX + offset[0]) + 'px';
		writing_form.style.top  = (e.clientY + offset[1]) + 'px';
   }
}, true);
