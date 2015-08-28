self.addEventListener("message", function(data) {

	throw Error("something went wrong");

	if (data.eventName === "start") {
	}

	console.log("getting started!");
	var y=0;
	for (var x=0; x<10000000000; x++) {
		y = x;
	}
	console.log("all done!");

	self.postMessage("Hi!");

});
