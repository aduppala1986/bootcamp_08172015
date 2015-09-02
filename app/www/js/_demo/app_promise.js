define(['jquery'], function() {

	function createPromise(willResolve, result, timeout) {

		var p = new Promise(function(resolve, reject) {
			setTimeout(function() {
				console.log("timeout expired");
				if (willResolve) {
					resolve(result);
				} else {
					reject(result);
				}
			}, timeout);

		});

		return p;
	}

	var
		p1 = createPromise(true, "a", 2000),
		p2 = createPromise(true, "b", 4000),
		p3 = createPromise(false, "c", 6000),
		p4 = createPromise(true, "d", 8000);

	p1.then(function() {
		console.log("promise 1 resolved");
	});
	p2.then(function() {
		console.log("promise 2 resolved");
	});
	p3.then(function() {
		console.log("promise 3 resolved");
	}, function() {
		console.log("promise 3 rejected");
	});
	p4.then(function() {
		console.log("promise 4 resolved");
	});

	Promise.all([p1,p2,p3,p4]).then(function(result) {
		console.log("all resolved");
		console.dir(result);
	}, function(result) {
		console.log("one rejected");
		console.dir(result);
	});


});
