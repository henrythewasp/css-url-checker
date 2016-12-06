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

		var mylist = [
			'list1', 'list2', 'list3'
		];

		var myfiles = [
			'file1', 'file2', 'file3'
		];
		var urls = [ 
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/petition.png',
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/content.png',
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/datastore.png',
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/group.png',
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/task.png',
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/report.png'
		];

		grunt.log.writeln('Webroot: ' + webroot);

		async.forEach(mylist, function(e, nextEntry) {
			grunt.log.writeln('Checking files in listentry: ' + e);

			async.forEach(myfiles, function(f, nextFile) {
				grunt.log.writeln('Checking URLs in file: ' + f);

				async.forEach(urls, function(u, nextURL) {
				/*	
					if (e === 'list3' && f === 'file2' && u === 'http://gtconsult.inovem.com/inovem/sites/images/objects/small/group.png') {
						u = 'http://gt.inovem.com/bollox.gif';
					}
				*/
					
					http.verify({
						url: u,
						conditions: {
							type: 'statusCode',
						value: 200
						}
					}, function(err) {
						if (err === null) {
							grunt.log.writeln('URL ' + u + ' checked');
							nextURL();
						} else {
							grunt.log.error('URL ' + u + ' is bad, err: ' + err);
							nextURL(err);
						}
					});
				}, function(error) {
					grunt.log.writeln('URLS FINISHED! Error is: ' + error);
					if (error === null) {
						grunt.log.writeln('All URLS checked in file ' + f);
						nextFile();
					} else {
						nextFile(error);
					}
				});
			}, function(error) {
				grunt.log.writeln('FILES FINISHED! Error is: ' + error);
				if (error === null) {
					grunt.log.writeln('All FILES checked');
					nextEntry();
				} else {
					nextEntry(error);
				}
			});

		}, function(error) {
			grunt.log.writeln('LIST FINISHED! Error is: ' + error);
			if (error === null) {
				grunt.log.writeln('All ENTRIES OK');
				done();
			} else {
				done(error);
			}
		});

		/*
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
		*/

		// grunt.log.writeln('All CSS files checked OK');
	});

};
