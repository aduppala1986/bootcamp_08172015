define(['jquery'], function() {

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		console.log(xhr.readyState, xhr.status);
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log(xhr.responseText);
		}
	};

	xhr.open("GET", "/api/widgets");
	xhr.send();

	$.ajax("/api/widgets").success(function(result) {
		console.dir(result);
	});

	//request("/api/widgets").then(function() {
	//	console.dir(arguments);
	//});

});
