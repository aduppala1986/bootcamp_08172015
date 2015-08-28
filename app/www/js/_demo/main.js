requirejs.config({

	paths: {
		jquery: "../libs/jquery/dist/jquery"
	},
	shim: { //can be used to specify other dependencies
		jquery: {
			exports: '$'
		}
	}

});

requirejs(['app-amd/app']); //in require.js format we do not mention .js. Hence app here refers app.js file
