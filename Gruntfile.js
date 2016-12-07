/*
 * grunt-css-url-checker
 * https://github.com/henrythewasp/css-url-checker
 *
 * Copyright (c) 2016 Gary Taylor
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
	css_url_checker: {
		nofiles_ok: {
			options: {
				fileroot: 'test/fixtures/',
				checkweb: true,
				checkfile: true
			},
			files: {
				src: []
			}
		},
	
		nourls_ok: {
			options: {
				fileroot: 'test/fixtures/',
				checkweb: true,
				checkfile: true
			},
			files: {
				src: ['test/fixtures/nourls.css']
			}
		},

		urls_ok: {
			options: {
				fileroot: 'test/fixtures/',
				checkweb: true,
				checkfile: true
			},
			files: {
				src: ['test/fixtures/test1.css', 'test/fixtures/test2.css']
			}
		},

		urls_ok_2: {
			options: {
				fileroot: 'test/fixtures/',
				checkweb: false,
				checkfile: true
			},
			files: {
				src: ['test/fixtures/test1.css', 'test/fixtures/test2.css', 'test/fixtures/test3.css']
			}
		},

		urls_fail: {
			options: {
				fileroot: 'test/fixtures/',
				checkweb: true,
				checkfile: false
			},
			files: {
				src: ['test/fixtures/test3.css']
			}
		},


	},

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'css_url_checker', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
