var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

var cssInput = './source/scss/**/*.scss';
var cssOutput = './public/assets/css';

var jsInput = './source/js/**/*.js';
var jsOutput = './public/assets/js';


// js shit
gulp.task('scripts', function() {
    return gulp.src(jsInput)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        // .pipe(gulp.dest(jsOutput))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(jsOutput))
        .pipe(browserSync.stream());
});

//Sass shit
gulp.task('sass', function () {
    return gulp.src('./source/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 2 versions', '> 5%', 'Firefox ESR']}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssOutput))
        .pipe(browserSync.stream());
});

// Watch files for change and set Browser Sync
gulp.task('watch', function() {
    // BrowserSync settings
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

// Scss file watcher
    gulp.watch(cssInput, ['sass'])
        .on('change', function(event){
            console.log('File' + event.path + ' was ' + event.type + ', running tasks...')
        });

//js file watcher
    gulp.watch(jsInput, ['scripts'])
        .on('change', function(event){
            console.log('File' + event.path + ' was ' + event.type + ', running tasks...')
        });


//HTML file watcher
    gulp.watch("./*.html").on('change', browserSync.reload);

});

// Default task
gulp.task('default', ['sass', 'watch', 'scripts']);