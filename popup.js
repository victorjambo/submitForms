//Global variables
var pageUrl = {};
var radio = {};
var dropdown = {};

//EventListener when popup has loaded
document.addEventListener('DOMContentLoaded', function() {
	//function to get current tab url
	chrome.tabs.getSelected(null, function(tab) {
		var urlRegex = /^https?:\/\/(?:[^.\/?#]+\.)?glassdoor\.com/; //regex
		var match = tab.url.match(urlRegex); //returns true or false
		if (match) { //test if url matches what is required
			pageUrl = tab.url;
		}else {
			$('#notification').html('<em style="color:red;">Invalid URL</em>'); //notify if url false
			document.getElementById('button').disabled = true;
		}
	});

	//listens to change in radio button
	$('input[name="type"]').change(function(e) {
		radio = $(this).val();
	});

	//listens to change in dropdown select
	$('select[id="ddselect"]').change(function(e) {
		dropdown = $(this).val();
	});

	//on button click EventListener
	$('#button').click(function() {
		//ajax to Submit form
		$.ajax({
			url: "https://docs.google.com/a/students.jkuat.ac.ke/forms/d/e/1FAIpQLScbsSMTZkI1irTOKsZz377Z7k8hd0VpD6fziG1QexAebqEoYg/formResponse",
			data: {
				"entry.1752584168": dropdown,
				"entry.1050227351": pageUrl,
				"entry.1903623179": radio
			},
			type: "POST",
			dataType: "xml",
			statusCode: {
				0: function() {
					$('#notification').html('<strong style="color:green;">Submitted:0</strong>');
				},
				200: function() {
					$('#notification').html('<strong style="color:green;">Submitted:200</strong>');
				},
			},
		});
		document.getElementById('button').disabled = true; //disable button to avoid double submission
	})
});

//var xpath = document.evaluate('//div[1]', window.document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).textContent;
