
var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    minify = require('gulp-minify');


gulp.task("script", function(){
	gulp.src('scripts/**/*.js')
		.pipe(concat('scripts.js'))
		.pipe(minify({
	        ext:{
	            src:'-scripts.js',
	            min:'.min.js'
	        }
	    }))
		.pipe(gulp.dest('js'))
});  