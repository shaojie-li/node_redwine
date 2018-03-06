//引入 gulp 和 nodemon livereload 插件  
var gulp       = require('gulp');  
var nodemon    = require('gulp-nodemon');  
var livereload = require('gulp-livereload');
var sass 	   = require('gulp-sass');
var rename 	   = require('gulp-rename');
  
// 一些文件的路径  
var paths = {  
    client: {
    	style_path: 'public/stylesheets/',
    	sass_path: 'public/stylesheets/mobile_sass/',
    	sass: 'public/stylesheets/mobile_sass/*.scss'
    },  
    server: {  
        index: 'bin/www'  
    }  
};  
  
// nodemon 的配置  
var nodemonConfig = {  
    script : paths.server.index,  
    ignore : [  
        "views/**"  
    ],  
    env    : {  
        "NODE_ENV": "development"  
    }  
};

// 配置sass任务
gulp.task('sass', function () {
  return gulp.src('public/stylesheets/mobile_sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('m.main.min.css'))
    .pipe(gulp.dest(paths.client.style_path));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(paths.client.sass, ['sass']);
});
  
// 使用 nodemone 跑起服务器  
gulp.task('serve', ['livereload'], function() {  
    return nodemon(nodemonConfig);  
}); 
  
  
// 当客户端被监听的文件改变时，刷新浏览器  
gulp.task('livereload', function() {  
    livereload.listen();  
    var server = livereload();  
    return gulp.watch(paths.client.sass, function(event) {  
        // server.changed(event.path); 
        livereload.changed(event.path); 
    });  
});  
  
// develop 任务， 同时开启 serve、livereload 任务  
gulp.task('develop', ['sass:watch', 'serve']);  