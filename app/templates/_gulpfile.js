'use strict';

var express     = require('express')
  , hogan       = require('hogan-express')
  , domain      = require('domain')
  , wiredep     = require('wiredep').stream
  , gulp        = require('gulp')
  , rename      = require('gulp-rename')
  , watch       = require('gulp-watch')
  , livereload  = require('gulp-livereload'),
  , injectRL    = require('gulp-inject-reload');

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
      .pipe( livereload() );
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
var spinUpExpress = function(){
  
  errorLogger.run(function(){
    var app = express();
    
    app.set('views', __dirname + '/build/');
    app.set('view engine', 'html');
    app.set('partials', {markup: 'markup'});
    app.engine('html', hogan);
    
    app.use('/bower_components', express.static(__dirname + '/bower_components'));
    app.use('/build', express.static(__dirname + '/build'));

    app.get('/', function(req, res){
      res.render('index');
    });
    
    app.listen(3000);
  });
};

// Watch Files
var watchFiles = function(){
  errorLogger.run(function(){
    livereload.listen();
    gulp.watch('./bower_components/*', ['wiredep']);
    gulp.watch('./codepen/*.${ htmlPre.ext }', ['html']);
    gulp.watch('./codepen/*.${ cssPre.ext }', ['css']);
    gulp.watch('./codepen/*.${ jsPre.ext }', ['js']);
  });
};

// Define Tasks
gulp.task('wiredep', clientDeps);
gulp.task('html', compileHtml);
gulp.task('css', compileCss);
gulp.task('js', compileJs);
gulp.task('serve', spinUpExpress);
gulp.task('watch', watchFiles);
gulp.task('build', ['wiredep', 'html', 'css', 'js']);
gulp.task('default', ['build', 'watch', 'serve']);

gulp.task('pub', function(){
  // PUBLISH TO CODEPEN
});

