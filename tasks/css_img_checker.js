/*
 * grunt-css-img-checker
 * https://github.com/henrythewasp/css-img-checker
 *
 * Copyright (c) 2016 Gary Taylor
 * Licensed under the MIT license.
 */

/*
 * TODO XXX - Add options to control what type of URL to check: web, file or both
 *          - Change name of this plugin to css-url-checker
 *          - Option to be verbose or just log errors
 *          - Option to add match filters for web and/or file URLs to control what gets checked
 *
 */

'use strict';

module.exports = function(grunt) {

	var optionsDefaults = {
		webroot		: '',
		checkweb	: true,
		checkfile	: true,
		verbose		: false,
		webfilter	: '',
		filefilter	: ''
	};

	grunt.registerMultiTask('css_img_checker', 'Checks existance of image file URLs in CSS files', function() {
		var parser = require('css-url-parser');
		var http = require('http-verify');
		var path = require('path');
		var async = require('async');
		var _ = require('lodash');

		var options = _.extend(optionsDefaults, this.options());
		var done = this.async();

		var writeLog = function(logdata) {
			if (options.verbose) {
				grunt.log.writeln(logdata);
			}
		};

		writeLog('Options: ' + JSON.stringify(options));

		async.forEach(this.files, function(file, nextEntry) {
			writeLog('Processing: ' + file.src.length + ' files');

			async.forEach(file.src, function(f, nextFile) {
				writeLog('Checking URLs in file: ' + f);
				var urls = parser(grunt.file.read(f));

				async.forEach(urls, function(u, nextURL) {
					var err = null;

					if (options.checkweb && u.toLowerCase().startsWith('http')) {
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

					} else if (options.checkfile && !u.toLowerCase().startsWith('data:')) {
						u = u.startsWith('/') ? u : path.join(options.webroot, u);

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
			grunt.log.writeln('All files checked: ' + (err === null ? 'OK' : err));
			done(err);
		});

	});

};
