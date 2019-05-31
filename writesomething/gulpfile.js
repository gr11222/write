var gulp = require('gulp');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var less =require('gulp-less');
var uglify  = require('gulp-uglify');
var connect = require('gulp-connect');
var cleanCss = require('gulp-clean-css');
var rev =require('gulp-rev');//md5加密
var inject = require('gulp-inject');//注入文件
var clean = require('gulp-clean');//清理文件
var sequence = require('gulp-sequence');//强制顺序执行文件

gulp.task('less',function(){
	return gulp.src('app/less/*.less')
			   .pipe(less())
			   .on('error', function(err) {
       				 console.log('错误!', err.message);
       				 this.end();
      			})
			   .pipe(autoprefixer())
			   .pipe(concat('app.min.css'))
			   .pipe(cleanCss())
			   .pipe(gulp.dest('app/'))
	});
gulp.task('js',function(){
 return gulp.src(['app/js/*.js'])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/'))
	});
gulp.task('localhost',function(){
 return	connect.server({
		root:'app/',
		port:8000
		})
	});
gulp.task('rev',function(){
	return gulp.src(['app/app.min.js','app/app.min.css'])
				.pipe(rev())
				.pipe(gulp.dest('app/'))
				.pipe(rev.manifest())//记录的json
				.pipe(gulp.dest('app/'))
	})
gulp.task('inject',function(){//将新生成的文件植入页面
	return gulp.src('app/index.html')
				.pipe(inject(gulp.src(['app/app-*.min.*']),{ignorePath:'app/',addRootSlash:false}))
				.pipe(gulp.dest('app/'))
	})

gulp.task('clean',function(){
	return gulp.src('app/app-*.min.*')
		       .pipe(clean())
	})

gulp.task('build',function(cb){
	return sequence('clean','rev','inject',cb)//按顺序执行
	})

gulp.task('myWatch',function(){
    	gulp.watch(['app/css/*.less'],['less']);
		gulp.watch(['app/js/*.js'],['js']);
		gulp.watch(['app/*.css','app/*.js'],['build']);
	});


gulp.task('default',['myWatch','localhost']);
