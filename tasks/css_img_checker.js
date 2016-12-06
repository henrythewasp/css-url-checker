/*
 * grunt-css-img-checker
 * https://github.com/henrythewasp/css-img-checker
 *
 * Copyright (c) 2016 Gary Taylor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	grunt.registerMultiTask('css_img_checker', 'Checks existance of image file URLs in CSS files', function() {
		var parser = require('css-url-parser');
		var path = require('path');
		// var webroot = grunt.config('css_img_checker.options.webroot') || '';
		var webroot = this.options().webroot || '';

		grunt.log.writeln('Webroot: ' + webroot);


		this.files.forEach(function(file) {
			grunt.log.writeln('Processing: ' + file.src.length + ' files');

			file.src.forEach(function(f) {
				grunt.log.writeln('Checking ' + f);
				var urls = parser(grunt.file.read(f));
				urls.forEach(function(u) {
					if (!u.toLowerCase().startsWith('http') && !u.toLowerCase().startsWith('data:')) {
						u = path.join(webroot, u);

						if (!grunt.file.exists(u)) {
							grunt.log.error('Missing: ' + u);
						}
					}
				});

			});
		});

		if (this.errorCount) { return false; }

		grunt.log.writeln('All CSS files checked OK');
	});

};
