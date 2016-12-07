'use strict';

var grunt = require('grunt'),
	path = require('path'),
	exec = require('child_process').exec,
	execOptions = {
		cwd: path.join(__dirname, '..')
	};

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.css_url_checker = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  nofiles_ok: function(test) {
    test.expect(1);

	exec('grunt css_url_checker:nofiles_ok', execOptions, function(error, stdout) {
		test.equal(stdout.indexOf('OK') > -1, true, 'No missing URLs.');
		test.done();
	});
  },

  nourls_ok: function(test) {
    test.expect(1);

	exec('grunt css_url_checker:nourls_ok', execOptions, function(error, stdout) {
		test.equal(stdout.indexOf('OK') > -1, true, 'No missing URLs.');
		test.done();
	});
  },

};
