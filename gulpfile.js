//引入 gulp 和 nodemon livereload 插件  
var gulp       = require('gulp');  
var nodemon    = require('gulp-nodemon');  
var livereload = require('gulp-livereload');
var sass 	   = require('gulp-sass');
var rename 	   = require('gulp-rename');
var autoFx     = require('gulp-autoprefixer');
var cssmin     = require('gulp-clean-css');

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

// 自动添加浏览器前缀
gulp.task('autoFx', function () {
    gulp.src(paths.client.style_path + '*.css')
    .pipe(autoFx({
        browsers: ['last 2 versions', 'Android >= 4.0','last 3 Explorer versions','last 3 Safari versions','Firefox >= 20','> 5%'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove:true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(gulp.dest(paths.client.style_path));
});


// 配置sass任务
gulp.task('sass', function () {
  return gulp.src('public/stylesheets/mobile_sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('m.main.min.css'))
    .pipe(cssmin())
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

gulp.task('pub',function(){
    gulp.run(['autoFx']);
}); 