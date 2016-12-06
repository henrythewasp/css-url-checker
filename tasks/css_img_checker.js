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

		var urls = [ 
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/petition.png',
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/content.png',
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/xdatastore.png',
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/group.png',
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/task.png',
			'http://gtconsult.inovem.com/inovem/sites/images/objects/small/report.png'
		];

		grunt.log.writeln('Webroot: ' + webroot);

		// urls.forEach(function(u) {
		async.forEach(urls, function(u, cb) {
			http.verify({
				url: u,
				conditions: {
					type: 'statusCode',
				value: 200
				}
			}, function(err) {
				// grunt.log.writeln('In http callback with err: ' + err);
				if (err === null) {
					grunt.log.writeln('URL ' + u + ' checked');
					cb();
				} else {
					grunt.log.error('URL ' + u + ' is bad, err: ' + err);
					cb(err);
				}
			});
		}, function(error) {
			grunt.log.writeln('URLS FINISHED! Error is: ' + error);
			if (error === null) {
				grunt.log.writeln('All URLs OK');
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
