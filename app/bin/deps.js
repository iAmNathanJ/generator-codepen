'use strict';

module.exports = function deps(name){

  var deps = {
    
    // Vanilla
    html: {
      name: 'HTML',
      install: false,
      manager: false,
      ext: 'html'
    },
    css: {
      name: 'CSS',
      install: false,
      manager: false,
      ext: 'css'
    },
    javascript: {
      name: 'JavaScript',
      install: false,
      manager: false,
      ext: 'js'
    },

    // HTML Pre Processors
    haml: {
      name: 'Haml',
      install: 'gulp-haml',
      manager: 'npm',
      ext: 'haml'
    },
    jade: {
      name: 'Jade',
      install: 'gulp-jade',
      manager: 'npm',
      ext: 'jade'
    },
    markdown: {
      name: 'Markdown',
      install: 'gulp-markdown',
      manager: 'npm',
      ext: 'md'
    },
    slim: {
      name: 'Slim',
      install: 'gulp-slim',
      manager: 'npm',
      ext: 'slim'
    },

    // CSS Pre Processors
    less: {
      name: 'Less',
      install: 'gulp-less',
      manager: 'npm',
      ext: 'less'
    },
    sass: {
      name: 'Sass',
      install: 'gulp-ruby-sass',
      manager: 'npm',
      ext: 'sass'
    },
    scss: {
      name: 'Scss',
      install: 'gulp-sass',
      manager: 'npm',
      ext: 'scss'
    },
    stylus: {
      name: 'Stylus',
      install: 'gulp-stylus',
      manager: 'npm',
      ext: 'styl'
    },

    // JS Pre Processors
    coffeescript: {
      name: 'CoffeeScript',
      install: 'gulp-coffee',
      manager: 'npm',
      ext: 'coffee'
    },
    livescript: {
      name: 'LiveScript',
      install: 'gulp-livescript',
      manager: 'npm',
      ext: 'ls'
    },
    traceur: {
      name: 'Traceur',
      install: 'gulp-traceur',
      manager: 'npm',
      ext: 'js'
    },

    // CSS Equalizers
    normalize: {
      name: 'Normalize.css',
      install: 'normalize.css',
      manager: 'bower',
      ext: 'css'
    },
    reset: {
      name: 'Reset.css',
      install: 'pen_components',
      manager: 'local',
      ext: 'css'
    },

    // CSS Post Processors
    autoprefixer: {
      name: 'Autoprefixer',
      install: 'gulp-autoprefixer',
      manager: 'npm',
      ext: null
    },
    prefixfree: {
      name: '-prefix-free',
      install: 'pen_components',
      manager: 'local',
      ext: null
    },

    // JS Libraries
    angular: {
      name: 'Angular',
      install: 'angular',
      manager: 'bower',
      ext: 'js'
    },
    jquery: {
      name: 'jQuery',
      install: 'jquery',
      manager: 'bower',
      ext: 'js'
    },
    mootools: {
      name: 'MooTools',
      install: 'mootools',
      manager: 'bower',
      ext: 'js'
    },
    prototype: {
      name: 'Prototype',
      install: 'prototype',
      manager: 'bower',
      ext: 'js'
    }

    // JS Feature Detection

    // /* * * Modernizr is on by default, for now * * */
    
    // modernizr: {
    //   name: 'Modernizr',
    //   install: 'modernizr',
    //   manager: 'bower',
    //   ext: 'js'
    // }
  };

  if(name){
    return  deps[name] || false; // Throw error
  }
  return deps;
};
