/**
 * Created by Paul on 4/25/2016.
 */
//Task Runner
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

gulp.task('build', function() {
    return browserify({
        entries:'app.js',
        extensions:['.jsx'],
        debug: true
    })
        // .transform(babelify)
        .transform('babelify',{presets:['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', function() {
    gulp.src('index.html')
        .pipe(gulp.dest('dist/'));
    gulp.src('*.*')
        .pipe(gulp.dest('dist/'));
    gulp.src('/vendors/*.*')
        .pipe(gulp.dest('dist/'));
})

gulp.task('compress', function() {
    return gulp.src('./dist/bundle.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function(cb) {
    runSequence('build','copy','compress', cb);

});

