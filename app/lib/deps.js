'use strict';

module.exports = function deps(name){

  var deps = {
    
    // Vanilla
    html: {
      name: 'HTML',
      install: false,
      manager: false,
      ext: 'html',
      codepen: 'none'
    },
    css: {
      name: 'CSS',
      install: false,
      manager: false,
      ext: 'css',
      codepen: 'none'
    },
    javascript: {
      name: 'JavaScript',
      install: false,
      manager: false,
      ext: 'js',
      codepen: 'none'
    },

    // HTML Pre Processors
    haml: {
      name: 'Haml',
      install: 'gulp-haml',
      manager: 'npm',
      ext: 'haml',
      codepen: 'haml'
    },
    jade: {
      name: 'Jade',
      install: 'gulp-jade',
      manager: 'npm',
      ext: 'jade',
      codepen: 'jade'
    },
    markdown: {
      name: 'Markdown',
      install: 'gulp-markdown',
      manager: 'npm',
      ext: 'md',
      codepen: 'markdown'
    },
    slim: {
      name: 'Slim',
      install: 'gulp-slim',
      manager: 'npm',
      ext: 'slim',
      codepen: 'slim'
    },

    // CSS Pre Processors
    less: {
      name: 'Less',
      install: 'gulp-less',
      manager: 'npm',
      ext: 'less',
      codepen: 'less'
    },
    sass: {
      name: 'Sass',
      install: 'gulp-ruby-sass',
      manager: 'npm',
      ext: 'sass',
      codepen: 'sass'
    },
    scss: {
      name: 'Scss',
      install: 'gulp-sass',
      manager: 'npm',
      ext: 'scss',
      codepen: 'scss'
    },
    stylus: {
      name: 'Stylus',
      install: 'gulp-stylus',
      manager: 'npm',
      ext: 'styl',
      codepen: 'stylus'
    },

    // JS Pre Processors
    coffeescript: {
      name: 'CoffeeScript',
      install: 'gulp-coffee',
      manager: 'npm',
      ext: 'coffee',
      codepen: 'coffeescript'
    },
    livescript: {
      name: 'LiveScript',
      install: 'gulp-livescript',
      manager: 'npm',
      ext: 'ls',
      codepen: 'livescript'
    },
    traceur: {
      name: 'Traceur',
      install: 'gulp-traceur',
      manager: 'npm',
      ext: 'js',
      codepen: 'traceur'
    },

    // CSS Equalizers
    normalize: {
      name: 'Normalize.css',
      install: 'normalize.css',
      manager: 'bower',
      ext: 'css',
      codepen: 'normalize'
    },
    reset: {
      name: 'Reset.css',
      install: 'pen_components',
      manager: 'local',
      ext: 'css',
      codepen: 'reset'
    },

    // CSS Post Processors
    autoprefixer: {
      name: 'Autoprefixer',
      install: 'gulp-autoprefixer',
      manager: 'npm',
      ext: null,
      codepen: 'autoprefixer'
    },
    prefixfree: {
      name: '-prefix-free',
      install: 'pen_components',
      manager: 'local',
      ext: null,
      codepen: 'prefixfree'
    },

    // JS Libraries
    angular: {
      name: 'Angular',
      install: 'angular',
      manager: 'bower',
      ext: 'js',
      codepen: 'angular'
    },
    jquery: {
      name: 'jQuery',
      install: 'jquery',
      manager: 'bower',
      ext: 'js',
      codepen: 'jquery'
    },
    mootools: {
      name: 'MooTools',
      install: 'mootools',
      manager: 'bower',
      ext: 'js',
      codepen: 'mootools'
    },
    prototype: {
      name: 'Prototype',
      install: 'prototype',
      manager: 'bower',
      ext: 'js',
      codepen: 'prototype'
    }

    // JS Feature Detection

    // /* * * Modernizr is on by default, for now * * */
    
    // modernizr: {
    //   name: 'Modernizr',
    //   install: 'modernizr',
    //   manager: 'bower',
    //   ext: 'js',
    // codepen: ''
    // }
  };

  if(name){
    return  deps[name] || false; // Throw error
  }
  return deps;
};
