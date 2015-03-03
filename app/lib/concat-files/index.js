var fs = require('fs');

module.exports = function(files, cb){

  'use strict';

  if(!Array.isArray(files)){
    throw new Error(files + ' must be an Array');
  }

  var fileConcat = files.reduce(function(prevFile, curFile){
    return prevFile + fs.readFileSync(curFile, 'utf8', function(err, data){
      if(err) return console.error(err);
      return data;
    });
  }, '');
  
  if(cb){
   cb(fileConcat);
  }

  return fileConcat;
};