'use strict';

var fs          = require('fs')
  , domain      = require('domain')
  , path        = require('path')
  , express     = require('express')
  , bodyParser  = require('body-parser')
  , hogan       = require('hogan-express')
  , wiredep     = require('wiredep').stream
  , gulp        = require('gulp')
  , plumber     = require('gulp-plumber')
  , concat      = require('gulp-concat')
  , rename      = require('gulp-rename')
  , livereload  = require('gulp-livereload')
  , escape      = require('escape-html');

// Define Gulp Paths
var paths = {
  index: {
    src: './build/index.html',
    dest: './build'
  },
  html: {
    src: './${ penTitle }.${ htmlPre.ext }',
    dest: './build/partials'
  },
  css: {
    src: ['./node_modules/normalize.css/normalize.css', './${ penTitle }.${ cssPre.ext }'],
    dest: './build/css'
  },
  js: {
    src: './${ penTitle }.${ jsPre.ext }',
    dest: './build/js'
  }
};

// Compile HTML
var compileHtml = function(){
  gulp.src(paths.html.src)
    .pipe( plumber() )
    <% if(htmlPre.install) { %>.pipe( require('${ htmlPre.install }')() )<% } %>
    .pipe( rename('markup.html') )
    .pipe( gulp.dest(paths.html.dest) )
    .pipe( livereload() );
};

// Compile CSS
var compileCss = function(){
  gulp.src(paths.css.src)
    .pipe( plumber() )
    <% if(cssPre.install) { %>.pipe( require('${ cssPre.install }')() )<% } %>
    .pipe( concat('${ penTitle }.css') )
    <% if(cssPost.install) { %>.pipe( require('${ cssPost.install }')() )<% } %>
    .pipe( gulp.dest(paths.css.dest) )
    .pipe( livereload() );
};

// Compile JS
var compileJs = function(){
  gulp.src(paths.js.src)
    .pipe( plumber() )
    <% if(jsPre.install) { %>.pipe( require('${ jsPre.install }')() )<% } %>
    .pipe( gulp.dest(paths.js.dest) )
    .pipe( livereload() );
};

// Create Server
var startExpress = function(){

  var app = express();

  app.set('views', __dirname + '/build');
  app.set('view engine', 'html');
  app.set('layout', 'layout')
  app.set('partials', {
    markup: 'partials/markup',
    codepenData: 'partials/codepen-data'
  });
  app.engine('html', hogan);

  app.use('/css', express.static(__dirname + '/build/css'));
  app.use('/js', express.static(__dirname + '/build/js'));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));
  app.use('/build', express.static(__dirname + '/build'));
  app.use('/publish', express.static(__dirname + '/build/publish'));

  app.get('/', function(req, res){
    res.render('index');
  });

  app.listen(3000);

};

var getFileContents = function(path){
  return fs.readFileSync(path, 'utf8', function(err, data){
    if(err) return console.error(err);
    return data;
  });
}

var codepenHiddenInput = function(){

  var data = JSON.stringify({

    title                 : '${ penTitle }',
    description           : '',
    html                  : getFileContents('./${ penTitle }.${ htmlPre.ext }'),
    html_pre_processor    : '${ htmlPre.codepen }',
    css                   : getFileContents('./${ penTitle }.${ cssPre.ext }'),
    css_pre_processor     : '${ cssPre.codepen }',
    css_pre_processor_lib : '',
    css_starter           : 'neither',
    css_prefix            : '${ cssPost.codepen }',
    js                    : getFileContents('./${ penTitle }.${ jsPre.ext }'),
    js_pre_processor      : '${ jsPre.codepen }',
    js_modernizr          : 'true',
    js_library            : '',
    html_classes          : '',
    head                  : '<meta name="viewport" content="width=device-width">',
    css_external          : '', // semi-colon separate multiple files
    js_external           : '' // semi-colon separate multiple files

  });

  return '<input type="hidden" name="data" value="' + escape(data) + '">';
};

var writeCodepenData = function(cb){
  fs.writeFile('./build/partials/codepen-data.html', codepenHiddenInput(), function(err){
    if(err) console.error(err);
    if(cb) cb();
  });
};

// Watch Files
var watchFiles = function(){
  livereload.listen();
  gulp.watch('./bower_components/*', ['wiredep']);
  gulp.watch('./*.${ htmlPre.ext }', ['write', 'html']);
  gulp.watch('./*.${ cssPre.ext }', ['write', 'css']);
  gulp.watch('./*.${ jsPre.ext }', ['write', 'js']);
};

// Tasks
gulp.task('write', writeCodepenData);
// gulp.task('wiredep', clientDeps);
gulp.task('html', compileHtml);
gulp.task('css', compileCss);
gulp.task('js', compileJs);
gulp.task('build', ['write', 'html', 'css', 'js']);
gulp.task('serve', ['build'], startExpress);
gulp.task('watch', watchFiles);
gulp.task('default', ['serve', 'watch']);
