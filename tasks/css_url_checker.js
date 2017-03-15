/*
 * grunt-css-url-checker
 * https://github.com/henrythewasp/css-url-checker
 *
 * Copyright (c) 2016 Gary Taylor
 * Licensed under the MIT license.
 */

/*
 * TODO XXX - Option to add match filters for web and/or file URLs to control what gets checked
 *
 */

'use strict';

module.exports = function(grunt) {

	var optionsDefaults = {
		fileroot	: '',
		checkweb	: true,
		checkfile	: true,
		verbose		: true,
		webmatch	: '',
		webignore	: '',
		filematch	: '',
		fileignore	: ''
	};

	grunt.registerMultiTask('css_url_checker', 'Checks existance of URLs in CSS files and reports on any that are missing / not found', function() {
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

					writeLog('Next URL: ' + u);

					if (u.toLowerCase().startsWith('http')) {
						if (options.checkweb) {
							u = u.split('?')[0];
							writeLog('Checking web URL: ' + u);

							http.verify({
								url: u,
								conditions: {
									type: 'statusCode',
									value: 200
								}
							}, function(err) {
								if (err !== null) {
									grunt.log.error('Bad URL(1) [' + u + '] in file [' + f + '] Error: ' + err);
								}
								nextURL(err);
							});
						} else {
							nextURL();
						}

					} else if (!u.toLowerCase().startsWith('data:')) {
						if (options.checkfile) {
							u = u.split('?')[0];
							u = path.join(options.fileroot, u);
							writeLog('Checking file URL: ' + u);

							if (!grunt.file.exists(u)) {
								err = new Error('Missing file!');
								grunt.log.error('Bad URL(2) [' + u + '] in file [' + f + '] Error: ' + err);
							}
						}
						nextURL(err);

					} else {
						nextURL();
					}

				}, function(err) {
					nextFile(err);
				});

			}, function(err) {
				nextEntry(err);
			});

		}, function(err) {
			grunt.log.writeln('All files checked: ' + (err === null ? 'OK' : 'Error = ' + err));
			done(err);
		});

	});

};
