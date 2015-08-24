require.config({

	paths: {
		jquery: "../libs/jquery/dist/jquery"
	},

	shim: {
		jquery: {
			exports: '$'
		}
	}

});

requirejs(['app-amd/app']);
