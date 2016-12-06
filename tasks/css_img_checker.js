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
		var http = require('http-verify');
		var path = require('path');
		var async = require('async');

		var webroot = this.options().webroot || '';
		var done = this.async();

		grunt.log.writeln('Webroot: ' + webroot);

		async.forEach(this.files, function(file, nextEntry) {
			grunt.log.writeln('Processing: ' + file.src.length + ' files');

			async.forEach(file.src, function(f, nextFile) {
				grunt.log.writeln('Checking URLs in file: ' + f);
				var urls = parser(grunt.file.read(f));

				async.forEach(urls, function(u, nextURL) {
					if (u.toLowerCase().startsWith('http')) {
						http.verify({
							url: u,
							conditions: {
								type: 'statusCode',
								value: 200
							}
						}, function(err) {
							if (err !== null) {
								grunt.log.error('Bad URL [' + u + '] in file [' + f + '] Error: ' + err);
							}
							nextURL(err);
						});

					} else if (!u.toLowerCase().startsWith('data:')) {
						u = path.join(webroot, u);
						var err = null;

						if (!grunt.file.exists(u)) {
							err = new Error('Missing file!');
							grunt.log.error('Bad URL [' + u + '] in file [' + f + '] Error: ' + err);
						}
						nextURL(err);
					}

				}, function(err) {
					nextFile(err);
				});

			}, function(err) {
				nextEntry(err);
			});

		}, function(err) {
			if (err === null) {
				grunt.log.writeln('All files checked: OK');
			} else {
				grunt.log.error('All files checked: ' + err);
			}
			done(err);
		});

	});

};
