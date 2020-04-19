let gulp = require("gulp");
let babel = require('gulp-babel');
let del = require("del");
let uglify = require("gulp-uglify");
let cssnano = require("gulp-cssnano");
let sourcemaps = require('gulp-sourcemaps');
let rev = require("gulp-rev");
let revCollector = require('gulp-rev-collector');
let minifyHtml = require('gulp-minify-html');
let proxy = require("http-proxy-middleware").createProxyMiddleware;
let connect = require("gulp-connect");

let sass = require('gulp-sass');
sass.compiler = require('node-sass');
let connect_options = {
    root: "./dist",
    port: 3000,
    // 自动刷新
    livereload: true,
    middleware: function () {

        return [
            proxy("/shot_list", {
                target: "http://116.62.207.144:10000/mock/5dc0e805c9b21d000aa729b0/host_goods",
                changeOrigin: true,
                pathRewrite: {
                    "/shot_list": ""
                }
            }),
            proxy("/productlis", {
                target: "http://116.62.207.144:10000/mock/5dc0e805c9b21d000aa729b0/productlist",
                changeOrigin: true,
                pathRewrite: {
                    "/productlis": ""
                }
            }),

            proxy("/jgsc", {
                target: "https://shopapi.smartisan.com/product/home",
                changeOrigin: true,
                pathRewrite: {
                    "/jgsc": ""
                }
            }),

            proxy("/dy", {
                target: "http://116.62.207.144:10000/mock/5dc0e805c9b21d000aa729b0/douyw",
                changeOrigin: true,
                pathRewrite: {
                    "/dy": ""
                }
            }),

            proxy("/secon_nav", {
                target: "https://shopapi.smartisan.com/v1/cms/second_nav",
                changeOrigin: true,
                pathRewrite: {
                    "/secon_nav": ""
                }
            }),
            proxy("/denglu", {
                target: "http://localhost/php/Smartisanback_dev/login.php",
                changeOrigin: true,
                pathRewrite: {
                    "/denglu": ""
                }
            }),

            proxy("/parts", {
                target: " https://shopapi.smartisan.com/v1/search/goods-list",
                changeOrigin: true,
                pathRewrite: {
                    "/parts": ""
                }
            })
        ]
    }
}

// 缓存处理方案 : rev => 给每个文件后面加上哈希值  rev-collector
// html 链接处理工具 rev-collector;
// gulp.task('connect', async () => {
//     connect.server(connect_options);
// });
// 没有经过处理的代码全部清空;
gulp.task("dele", async () => {
    await del(['./dist/**/*']);
})

gulp.task('connect', async () => {
    connect.server(connect_options);
});

// js转义 + 压缩
gulp.task("javascript", async () => {
    gulp.src(["./src/js/**/*.js"])
        // js转义 ESn => ES5;
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // sourcemaps 索引初始化;
        .pipe(sourcemaps.init())
        // JS压缩 
        .pipe(uglify())
        // 版本号;
        .pipe(rev())
        // sourcemaps 写入
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist/js"))
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'))
        .pipe(connect.reload())
})
// css压缩; + 压缩调试工具;
// gulp.task("css", async () => {
//     gulp.src(["./src/css/*.css"])
//         // sourcemaps 索引初始化;
//         .pipe(sourcemaps.init())
//         .pipe(cssnano({ zindex: false }))
//         // 压缩


//         //添加了配置  导致压缩之后改写z-index的问题
//         // sourcemaps 写入
//         // 加上 sourcemaps.write(".")独立产生一个sourcemaps文件;
//         // sourcemaps.write() 什么都不加就是base64码直接写在了文件之中;
//         // 版本号;
//         .pipe(rev())
//         .pipe(sourcemaps.write("."))
//         .pipe(gulp.dest("./dist/css/"))
//         // 进行哈希版本号的记录的;创建一个json文件;
//         .pipe(rev.manifest())
//         // 把json文件存储在对应的路径下;
//         .pipe(gulp.dest('rev/css'));
// })
// html 压缩 ;
gulp.task("html", async () => {
    // 一定要写入 rev/**/*.json 路径,这个东西必须读取后才能获得才能获得改变后的文件哈希路径;
    gulp.src(["rev/**/*.json", "./src/html/**/*.html"])
        .pipe(revCollector({
            // 用哈希路径替换原有路径：
            replaceReved: true,
        }))
        .pipe(minifyHtml())
        .pipe(gulp.dest("./dist/html"))
        .pipe(connect.reload())
})
gulp.task("img", async () => {
    gulp.src(["./src/img/*.*"])
        // 把scss源进行处理，编译成 css;
        .pipe(gulp.dest("./dist/img/"))
        .pipe(connect.reload())
})
gulp.task("scss", async () => {
    gulp.src(["./src/scss/*.scss"])
        // 把scss源进行处理，编译成 css;
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(cssnano({ zindex: false }))
        // 压缩


        //添加了配置  导致压缩之后改写z-index的问题
        // sourcemaps 写入
        // 加上 sourcemaps.write(".")独立产生一个sourcemaps文件;
        // sourcemaps.write() 什么都不加就是base64码直接写在了文件之中;
        // 版本号;
        .pipe(rev())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./dist/css/"))
        .pipe(rev.manifest())
        // 把json文件存储在对应的路径下;
        .pipe(gulp.dest('rev/css'))
        .pipe(connect.reload())
})
gulp.task("watch", async () => {
    gulp.watch(["./src/html/**/*.html"], gulp.series("html"));
    gulp.watch(["./src/js/*.js"], gulp.series("javascript"));
    // gulp.watch(["./src/css/*.css"], gulp.series("css"));
    gulp.watch(["./src/scss/**/*.scss"], gulp.series("scss"));
})
// gulp.task("build", gulp.series("dele", "img", "javascript", "scss", "html"));
gulp.task("build", gulp.parallel("watch", "connect", gulp.series("dele", "html", "javascript", "scss", "img")));


