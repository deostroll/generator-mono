var gulp = require('gulp');
var exec = require('child_process').exec;
var chalk = require('chalk');

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
    stdout: process.stdout,
    cwd: './bin'
  };
  return new Promise(runTask);

  function runTask(done) {
    warn('Compiling...');
    exec('mcs ../src/Program.cs -out:../bin/Program.exe', opts, function(err, stdout, stderr){
      if(err) {
        // console.log('Err:', err)
        error('Error in compilation');
        console.log(stderr);
        done();
      }
      else {
        success('Compilation Success.')
        exec('mono Program.exe', opts, function(err, stdout, stderr) {
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
