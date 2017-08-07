
import "fullpage.js/dist/jquery.fullpage.min.js"
import "fullpage.js/dist/jquery.fullpage.min.css"
import $ from "jquery";
var path = require('path');

let html = `

	<div id="fullpage">
		<div class="section">
			<h1>section1</h1>
		</div>
		<div class="section" >
			<h1>section2</h1>
		</div>
		<div class="section">
			<h1>section3</h1>
		</div>
		<div class="section">
			<h1>section4</h1>
		</div>
		<div class="section">
			<h1>section1</h1>
		</div>
		<div class="section" >
			<h1>section2</h1>
		</div>
		<div class="section">
			<h1>section3</h1>
		</div>
		<div class="section">
			<h1>section4</h1>
		</div>
		<div class="section">
			<h1>section3</h1>
		</div>
		<div class="section">
			<h1>section4</h1>
		</div>
	</div>
`
document.body.innerHTML+= html;

var getBg = function(){
	var arr = ['pic_1_2.jpg','pic_11.jpg','pic_2.jpg',
'pic_3.jpg','pic_4.jpg','pic_5.jpg','pic_6.jpg',
'pic_7.jpg','pic_8.jpg','pic_9_1.jpg','pic_10.jpg'];
var ROOT_PATH = 'fullpage/app/img'
	var arrImg =  arr.map(function(x){
		return '../app/img/' + x
	})
	return arrImg;
}

var setBg = function(){
	$(".section").each(function(index){
		// console.log($(this).css('background-color'))
		$(this).css('background-image',"url("+getBg()[index]+")")
	})
}


$(document).ready(function() {
	$('#fullpage').fullpage({
		//Navigation
		menu:'#menu',
		anchors:['firstPage', 'secondPage', 'thirdPage','fourthPage'],
		navigation:true,
		navigationPosition:'right',
		navigationColor:'black',
		navigationTooltips:['firstPage', 'secondPage', 'thirdPage','fourthPage'],
		sectionsColor: ['#e2e2e2', '#4BBFC3', '#7BAABE', 'whitesmoke'],
		
		//Scrolling
		css3:true,
		//Accessibility
		//Design
		//Custom selectors
		//events
	});
	setBg();
});
