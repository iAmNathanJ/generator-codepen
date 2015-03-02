'use strict';

var fs          = require('fs')
  , util        = require('util')
  , path        = require('path')
  , yeoman      = require('yeoman-generator')
  , chalk       = require('chalk')
  , yosay       = require('yosay')
  , getPrompts  = require('./bin/prompts')
  , deps        = require('./bin/deps');


var cpGen = module.exports = yeoman.Base.extend({

  constructor: function(){
    yeoman.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: false, optional: true });
  },

  init: function(){
    
    // Your initialization methods (checking current project state, getting configs, etc
    this.devDeps = {};
    this.localDeps = {};

    this.buildPackageList = function(packages, manager){

      var dependencies = [];

      for(var key in packages){
        if(packages.hasOwnProperty(key)){
          if(packages[key] && packages[key].manager == manager){
            dependencies.push(packages[key].install);
          }
        }
      }
      return dependencies;
    };
  
  },

  prompting: function(){
    
    var done = this.async();

    // Greeting
    this.log(yosay(
      chalk.magenta('Codepen Generator')
    ));

    this.log(chalk.cyan(
      '\nGenerate a light weight development environment for hacking around ideas.\n'
      // 'When you\'ve completed your masterpiece, you can publish it straight to Codepen!\n'
    ));

    // Get Propmts
    var prompts = getPrompts(this.appname);

    // Display Prompts
    this.prompt(prompts, function (props) {
      

      this.options.penTitle = this._.camelize(props.penTitle);
      
      this.devDeps.htmlPre       = deps(props.htmlPre);
      this.devDeps.cssPre        = deps(props.cssPre);
      this.devDeps.cssEq         = deps(props.cssEq);
      this.devDeps.cssPost       = deps(props.cssPost);
      this.devDeps.jsPre         = deps(props.jsPre);
      this.devDeps.jsLib         = deps(props.jsLib);
      // this.devDeps.featureDetect = deps(props.featureDetect);

      this.log('\nLet\'s roll, Bob Dole.\n');
     
      done();
    
    }.bind(this));
  
  },

  config: function(){
    // Saving configurations and configure the project (creating .editorconfig files and other metadata files)
  },
  default: function(){
  },
  writing: function(){

    this.fs.copyTpl(
      this.templatePath('_gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {
        penTitle: this.options.penTitle,
        htmlPre: this.devDeps.htmlPre,
        cssPre: this.devDeps.cssPre,
        cssEq: this.devDeps.cssEq,
        cssPost: this.devDeps.cssPost,
        jsPre: this.devDeps.jsPre,
        jsLib: this.devDeps.jsLib,
        featureDetect: this.devDeps.featureDetect,
      }
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        penTitle: this.options.penTitle
      }
    );
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      {
        penTitle: this.options.penTitle
      }
    );
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('./build/index.html'),
      {
        penTitle: this.options.penTitle,
        htmlPre: this.devDeps.htmlPre,
        cssPre: this.devDeps.cssPre,
        jsPre: this.devDeps.jsPre
      }
    );

    // HTML
    this.fs.copyTpl(
      this.templatePath('_blank'),
      this.destinationPath('./codepen/codepen.' + this.devDeps.htmlPre.ext),
      { comment: '' }
    );
    // CSS
    this.fs.copyTpl(
      this.templatePath('_blank'),
      this.destinationPath('./codepen/codepen.' + this.devDeps.cssPre.ext),
      { comment: '' }
    );
    // JS
    this.fs.copyTpl(
      this.templatePath('_blank'),
      this.destinationPath('./codepen/codepen.' + this.devDeps.jsPre.ext),
      { comment: '' }
    );

  },
  conflicts: function(){
    // Where conflicts are handled (used internally)
  },
  install: function(){
    var baseNodeDeps  = ['express', 'hogan-express', 'wiredep', 'gulp', 'gulp-rename', 'gulp-livereload', 'gulp-inject-reload', 'gulp-watch']
      , baseBowerDeps = ['modernizr']
      , nodeDeps      = baseNodeDeps.concat(this.buildPackageList(this.devDeps, 'npm'))
      , bowerDeps     = baseBowerDeps.concat(this.buildPackageList(this.devDeps, 'bower'))
      , localDeps     = this.buildPackageList(this.devDeps, 'local');

    this.npmInstall(nodeDeps, { saveDev: true });
    this.bowerInstall(bowerDeps, { save: true });
  },
  end: function(){
    // Called last, cleanup, say good bye, etc
    this.log(chalk.cyan(
      '\nYou\'re all set up!\n' +
      '1. Run `gulp` to start the server.\n' +
      '2. Open ./codepen in your favorite editor.\n' +
      '3. Navigate your browser to http://localhost:3000 ...enjoy.\n'
      // 'Run "gulp pub" to publish to Codepen.\n'
    ));
  }

});
