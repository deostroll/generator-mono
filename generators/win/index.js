var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
module.exports = generators.Base.extend({
  init: function() {
    mkdirp('src');
    this.copy('Program.cs', 'src/Program.cs');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('package.json', 'package.json');
    this.copy('.gitignore', '.gitignore');

    mkdirp('bin');
  },
  install: function() {
    this.npmInstall();
  }
})
