var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	rename = require('gulp-rename'),
	babel = require('babelify'),
	jshint = require('gulp-jshint'),
	header = require('gulp-header');

var config = {
	pluginName: 'secreto',
	mainFile: './src/app.js',
	dest: { 
	    js: './dist/js/'
	}
};

var pkg = require('./package.json');
var banner = ['/**',
	' * <%= pkg.name %> - <%= pkg.description %>',
	' * @version v<%= pkg.version %>',
	' * @link <%= pkg.homepage %>',
	' * @license <%= pkg.license %>',
	' */',
	''
].join('\n');

gulp.task('phonegap', function() {
   return gulp.src(['!node_modules/**/*','**/*', '!node_modules/**/*']).pipe(gulp.dest('../phonegap/secreto/www/')); 
});

gulp.task('jshint', function() {
	return gulp.src([config.mainFile])
		.pipe(jshint({
			esnext: true
		}))
		.pipe(jshint.reporter('default'));
});

gulp.task('browserify-watch', function() {
	browserifyShare(true);
});

gulp.task('browserify', function() {
	browserifyShare(false);
});

function browserifyShare(watch) {
	var b = browserify({
		cache: {},
		packageCache: {},
		notify: false,
		standalone: config.pluginName
	}).transform(babel);

	if (watch) {
		b = watchify(b);
		b.on('update', function() {
			bundleShare(b);
		});
	}

	b.add(config.mainFile);
	bundleShare(b);
}

function bundleShare(b) {
	b.bundle()
		.pipe(source(config.pluginName + '.js'))
		.pipe(buffer())
		.pipe(header(banner, {
			pkg: pkg
		}))
		.pipe(gulp.dest(config.dest.js))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest(config.dest.js))
		.on('error', function(err) {
			console.error(err);
			this.emit('end');
		});
}

gulp.task('default', ['browserify-watch']);
gulp.task('build', ['browserify', 'phonegap']);