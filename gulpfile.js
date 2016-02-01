var gulp = require('gulp');
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    minifyCss = require('gulp-minify-css'),
    pngquant = require('imagemin-pngquant');

var path = {
    build: { 
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: { 
        html: '*.html', 
        js: 'liberis/*.js',
        style: 'less/main.less',
        img: 'images/*.*', 
        fonts: 'fonts/**/*.*'
    },
    watch: { 
        html: '*.html',
        js: 'src/js/**/*.js',
        style: 'css/*.css',
      
    },
    clean: './dist'
};


gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.html)) 
      
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger()) 
        .pipe(uglify()) 
        .pipe(gulp.dest(path.build.js)) 
       
});


gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sourcemaps.init()) 
        .pipe(less()) 
        .pipe(prefixer()) 
        .pipe(cssmin()) 
        .pipe(minifyCss())
        
        .pipe(gulp.dest(path.build.css)) 
        
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) 
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('default', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);