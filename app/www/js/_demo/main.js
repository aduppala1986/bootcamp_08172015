requirejs.config({

	paths: {
		jquery: "../libs/jquery/dist/jquery"
	},

	config: {
		"app/i18n": {
			locale: 'dog-corgi'
		}
	},

	shim: {
		jquery: {
			exports: '$'
		}
	}

});

requirejs(['app/app']);
