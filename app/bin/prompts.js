'use strict';

var chalk = require('chalk');

module.exports = function prompts(appname){

  var msg = {
    htmlPre: 'Can I interest you in an HTML pre-processor?',
    cssPre: 'What CSS pre-processor would you like?',
    cssEq: 'How about CSS equalization?',
    cssPost: 'Would you like to automate vendor prefixes? (Hint: YES)',
    jsPre: 'Use a JavaScript pre-processor?',
    jsLib: 'Can I get you a common JavaScript library to work with?',
    featureDetect: 'Lastly, would you like to impliment feature detection?'
  };

  var optOut = {
    htmlPre: 'None for me, thanks.',
    cssPre: 'Use straight CSS.',
    cssEq: 'No thanks.',
    cssPost: 'That won\'t be necessary.',
    jsPre: 'Maybe next time.',
    jsLib: 'Keep it vanilla for now.',
    featureDetect: 'No thanks. Get on with it.'
  };

  return [{

      type: 'input',
      name: 'penTitle',
      message: chalk.yellow('What\'s the title of your pen?'),
      default: appname
    
    },{

      type: 'list',
      name: 'htmlPre',
      message: chalk.yellow(msg.htmlPre),
      choices: [{
        name: optOut.htmlPre,
        value: 'html'
      },{
        name: 'Haml',
        value: 'haml'
      },{
        name: 'Jade',
        value: 'jade'
      },{
        name: 'Markdown',
        value: 'markdown'
      },{
        name: 'Slim',
        value: 'slim'
      }],
      default: 'html',
      store: true

    },{

      type: 'list',
      name: 'cssPre',
      message: chalk.yellow(msg.cssPre),
      choices: [{
        name: optOut.cssPre,
        value: 'css'
      },{
        name: 'Less',
        value: 'less'
      },{
        name: 'Sass',
        value: 'sass'
      },{
        name: 'Scss',
        value: 'scss'
      },{
        name: 'Stylus',
        value: 'stylus'
      }],
      default: 'css',
      store: true
    
    },{
    
      type: 'list',
      name: 'cssEq',
      message: chalk.yellow(msg.cssEq),
      choices: [{
        name: optOut.cssEq,
        value: false
      },{
        name: 'Normalize',
        value: 'normalize'
      },{
        name: 'Reset',
        value: 'local'
      }],
      default: false,
      store: true
    
    },{
    
      type: 'list',
      name: 'cssPost',
      message: chalk.yellow(msg.cssPost),
      choices: [{
        name: optOut.cssPost,
        value: false
      },{
        name: 'Autoprefixer',
        value: 'autoprefixer'
      },{
        name: '-prefix-free',
        value: 'local'
      }],
      default: 'autoprefixer',
      store: true
    
    },{
    
      type: 'list',
      name: 'jsPre',
      message: chalk.yellow(msg.jsPre),
      choices: [{
        name: optOut.jsPre,
        value: 'javascript'
      },{
        name: 'CoffeScript',
        value: 'coffeescript'
      },{
        name: 'LiveScript',
        value: 'livescript'
      },{
        name: 'Traceur',
        value: 'traceur'
      }],
      default: 'javascript',
      store: true
    
    },{
    
      type: 'list',
      name: 'jsLib',
      message: chalk.yellow(msg.jsLib),
      choices: [{
        name: optOut.jsLib,
        value: false
      },{
        name: 'Angular',
        value: 'angular'
      },{
        name: 'jQuery',
        value: 'jquery'
      },{
        name: 'MooTools',
        value: 'mootools'
      },{
        name: 'Prototype',
        value: 'prototype'
      }],
      default: false,
      store: true
    
    }
    // Modernizr is on by default, for now.
    // ,{
    
    //   type: 'list',
    //   name: 'featureDetect',
    //   message: chalk.yellow(msg.featureDetect),
    //   choices: [{
    //     name: optOut.featureDetect,
    //     value: false
    //   },{
    //     name: 'Modernizr',
    //     value: 'modernizr'
    //   }],
    //   default: false,
    //   store: true
    
    // }
    ];
};
