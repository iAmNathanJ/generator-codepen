'use strict';

var fs          = require('fs')
  , domain      = require('domain')
  , express     = require('express')
  , hogan       = require('hogan-express')
  , wiredep     = require('wiredep').stream
  , gulp        = require('gulp')
  , rename      = require('gulp-rename')
  , watch       = require('gulp-watch')
  , livereload  = require('gulp-livereload')
  , open        = require('gulp-open')
  , injectRL    = require('gulp-inject-reload')
  , inject      = require('gulp-inject')
  , escape      = require('escape-html')
  , concatf     = require('concat-files');

// Define Gulp Paths
var paths = {
  index: {
    src: './build/index.html',
    dest: './build'
  },
  html: {
    src: './codepen/codepen.${ htmlPre.ext }',
    dest: './build'
  },
  css: {
    src: './codepen/codepen.${ cssPre.ext }',
    dest: './build'
  },
  js: {
    src: './codepen/codepen.${ jsPre.ext }',
    dest: './build'
  }
};

// Handle Errors
var errorLogger = domain.create();
errorLogger.on('error', function(err){
  console.log('Error: ' + err.message + '\nFile: ' + err.fileName + ' : Line ' + err.lineNumber);
});

// Wire Client Side Dependencies
var clientDeps = function(){
  errorLogger.run(function(){
    gulp.src(paths.index.src)
      .pipe( wiredep({
        directory: './bower_components/',
        bowerJson: require('./bower.json')
      }) )
      .pipe( injectRL() )
      .pipe( gulp.dest(paths.index.dest) )
      .pipe( open('', {url: 'http://localhost:3000'}) );
  });
}

// Compile HTML
var compileHtml = function(){
  errorLogger.run(function(){
    gulp.src(paths.html.src)
      <% if(htmlPre.install) { %>.pipe( require('${ htmlPre.install }')() )<% } %>
      .pipe( rename('markup.html') )
      .pipe( gulp.dest(paths.html.dest) )
      .pipe( livereload() );
  });
};

// Compile CSS
var compileCss = function(){
  errorLogger.run(function(){
    gulp.src(paths.css.src)
      <% if(cssPre.install) { %>.pipe( require('${ cssPre.install }')() )<% } %>
      <% if(cssPost.install) { %>.pipe( require('${ cssPost.install }')() )<% } %>
      .pipe( gulp.dest(paths.css.dest) )
      .pipe( livereload() );
  });
};

// Compile JS
var compileJs = function(){
  errorLogger.run(function(){
    gulp.src(paths.js.src)
      <% if(jsPre.install) { %>.pipe( require('${ jsPre.install }')() )<% } %>
      .pipe( gulp.dest(paths.js.dest) )
      .pipe( livereload() );
  });
};

// Create Server
var startExpress = function(){
  
  errorLogger.run(function(){
    var app = express();
    
    app.set('views', __dirname + '/build/');
    app.set('view engine', 'html');
    app.set('partials', {markup: 'markup'});
    app.engine('html', hogan);
    
    app.use('/bower_components', express.static(__dirname + '/bower_components'));
    app.use('/build', express.static(__dirname + '/build'));
    app.use('/publish', express.static(__dirname + '/publish'));

    app.get('/', function(req, res){
      res.render('index');
      gulp.run(['inject']);
    });
    
    app.listen(3000);
  });
};

var getFileContents = function(path){
  return fs.readFileSync(path, 'utf8', function(err, data){
      if(err) return console.error(err);
      return data;
    });
}

var writeData = function(){
  var injection
    , data = JSON.stringify({
    title                 : 'Pen',
    description           : '',
    html                  : getFileContents('./codepen/codepen.${ htmlPre.ext }'),
    html_pre_processor    : '${ htmlPre.codepen }',
    css                   : getFileContents('./codepen/codepen.${ cssPre.ext }'),
    css_pre_processor     : '${ cssPre.codepen }',
    css_pre_processor_lib : '',
    css_starter           : 'neither',
    css_prefix            : '${ cssPost.codepen }',
    js                    : getFileContents('./codepen/codepen.${ jsPre.ext }'),
    js_pre_processor      : '${ jsPre.codepen }',
    js_modernizr          : 'true',
    js_library            : '${ jsLib.codepen }',
    html_classes          : '',
    head                  : '<meta name="viewport" content="width=device-width">',
    css_external          : '', // semi-colon separate multiple files
    js_external           : '' // semi-colon separate multiple files
  });
  
  injection = '<input type="hidden" name="data" value=\'' + data + '\'>';

  fs.writeFile('./publish/codepenJSON.html', escape(injection), function(err){
    if(err) console.error(err);
  });
};

var injectData = function(){
  var source = gulp.src('./publish/codepenJSON.html');
  errorLogger.run(function(){
    gulp.src(paths.index.src)
      .pipe( inject(source, {transform: function(path, file){
        return file.contents.toString('utf8');
      }}) )
      .pipe( gulp.dest(paths.index.dest) )
      .pipe( livereload() );
  });
};

// Watch Files
var watchFiles = function(){
  errorLogger.run(function(){
    livereload.listen();
    gulp.watch('./bower_components/*', ['wiredep']);
    gulp.watch('./codepen/*.${ htmlPre.ext }', ['html', 'inject']);
    gulp.watch('./codepen/*.${ cssPre.ext }', ['css', 'inject']);
    gulp.watch('./codepen/*.${ jsPre.ext }', ['js', 'inject']);
  });
};

// Tasks
gulp.task('wiredep', clientDeps);
gulp.task('html', compileHtml);
gulp.task('css', compileCss);
gulp.task('js', compileJs);
gulp.task('build', ['wiredep', 'html', 'css', 'js']);
gulp.task('serve', ['build'], startExpress);
gulp.task('watch', watchFiles);
gulp.task('default', ['serve', 'watch']);

gulp.task('write', writeData);
gulp.task('inject', ['write'], injectData);


