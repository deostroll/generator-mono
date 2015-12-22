var gulp = require('gulp');
var exec = require('child_process').exec;
var chalk = require('chalk');
var path = require('path');

var csc = path.join(process.env.WINDIR,'Microsoft.NET', 'Framework', 'v4.0.30319', 'csc.exe');

function error(msg) {
  console.log(chalk.red(msg));
}

function success(msg) {
  console.log(chalk.green(msg));
}

function warn(msg) {
  console.log(chalk.yellow(msg));
}

gulp.task('compile', function(){
  var opts = {
    stdout: process.stdout
  };
  return new Promise(runTask);

  function runTask(done) {
    warn('Compiling...');
    exec( csc + ' /nologo /out:bin\\Program.exe src\\Program.cs', opts, function(err, stdout, stderr){
    //exec([csc, '/nologo', '/out:bin\\Program.exe', 'src\\Program.cs'], opts, function(err, stdout, stderr){
      if(err) {
        // console.log('Err:', err.message)
        error('Error in compilation');
        console.log(stdout);
        done();
      }
      else {
        success('Compilation Success.')
        exec('bin\\Program.exe', opts, function(err, stdout, stderr) {
          if(err) {
            error('Runtime Error');
            console.log(stderr);
            done();
          }
          else if (stdout) {
            console.log(stdout);
            success('Execution Finished');
            done();
          }
        });
      }
    });
  }
});

gulp.task('default', function(){
    gulp.watch('src/Program.cs', ['compile']);
});
