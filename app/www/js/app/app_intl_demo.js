(function() {

	var dependencies = [
		"jquery", "underscore", "backbone", "marionette",
		"app/models/account", "app/app.templates.hbs", "stickit"
	];

	function app($, _, Backbone, Marionette,
		Account, templates) {

			/*
			var number = 3500;
			var locale = 'de-DE';
			var options = { style: 'currency', currency: 'EUR' };
			var numberFormat = new Intl.NumberFormat(locale, options);
			console.log(numberFormat.format(number));
			// demo in chrome and firefox
			numberFormat = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });
			number = 123000;
			console.log(numberFormat.format(number));
			*/

			/*
			var date = new Date(Date.UTC(2015, 8, 8, 12, 0, 0));
			console.dir(date);
			console.log(new Intl.DateTimeFormat('en-US').format(date));
			console.log(new Intl.DateTimeFormat('en-GB').format(date));
			console.log(new Intl.DateTimeFormat('ar-EG').format(date));
			var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			console.log(new Intl.DateTimeFormat('de-DE', options).format(date));
			options.timeZone = 'UTC';
			options.timeZoneName = 'short';
			console.log(new Intl.DateTimeFormat('en-US', options).format(date));
			options = {
			  year: 'numeric', month: 'numeric', day: 'numeric',
			  hour: 'numeric', minute: 'numeric', second: 'numeric',
			  hour12: false
			};
			console.log(date.toLocaleString('en-US', options));
			*/

			/*
			console.log(new Intl.Collator().compare('a', 'c')); // → a negative value
			console.log(new Intl.Collator().compare('c', 'a')); // → a positive value
			console.log(new Intl.Collator().compare('a', 'a')); // → 0
			// in German, ä sorts with a
			console.log(new Intl.Collator('de').compare('ä', 'z'));
			// → a negative value
			// in Swedish, ä sorts after z
			console.log(new Intl.Collator('sv').compare('ä', 'z'));
			// → a positive value
			*/

	}

	define(dependencies, app);

})();
