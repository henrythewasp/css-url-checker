# grunt-css-url-checker

> Checks existance of URLs in CSS files

## Getting Started
This plugin requires Grunt `~0.4.5` and http-verify.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-url-checker --save-dev
```

You may also need to install http-verify and path npm packages with these commands:

```shell
npm install http-verify --save-dev
npm install path --save-dev
```

Once the plugin and dependency have been installed, it can be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-url-checker');
```

## The "css_url_checker" task

### Overview
In your project's Gruntfile, add a section named `css_url_checker` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  css_url_checker: {
    options: {
      fileroot: 'my/webroot/folder/',
      checkweb: true,
      checkfile: true,
      verbose: true
    },
    files: {
      src: ['src/css/file1.css','src/css/file2.css'] 
    },
  },
});
```

### Options

#### options.fileroot
Type: `String`
Default value: `''`

The file root that is prepended onto a relative file path before checking the file exists.

#### options.checkweb
Type: `Boolean`
Default value: `true`

Boolean flag to control checking of web URLs (ie. http / https).

#### options.checkfile
Type: `Boolean`
Default value: `true`

Boolean flag to control checking of file URLs.

#### options.verbose
Type: `Boolean`
Default value: `true`

Boolean flag to control how much output is generated.

### Usage Examples

#### Default Options
In this example, the default options are used to check all web and file URLs.  All file URLs are expected to be absolute.

```js
grunt.initConfig({
  css_url_checker: {
    options: {},
    files: {
      src: ['src/css/file1.css', 'src/css/file2.css'],
    },
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
