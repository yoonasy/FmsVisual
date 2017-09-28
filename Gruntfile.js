module.exports = function(grunt) {
    // init
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Metadata.
        meta: {
            basePath: 'html/',
            srcPath: 'html/css/',
            deployPath: 'html/css/'
        },
        
        
        
        // JSmin
        uglify: {
            dev: {
                options: {
                    banner: "'use strict';\n/** \n * @Name     <%= pkg.name %>\n * @Author   <%= pkg.author %> \n * @Date     <%= grunt.template.today(\"yyyy-mm-dd\") %>\n * @Version  <%= pkg.version %>\n */\n"
                },
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['*.js', '!*.min.js'],
                    dest: 'src/js',
                    ext: '.min.js'

                }]
            }
        },
        
        
        
        // CSSmin
        cssmin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'html/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'html/css',
                    ext: '.min.css'
                }]
            }
        },
        
        
        
        // JavaScript Syntax Check
        jshint: {
            files : ['src/*.js'],

            options: {

                // "strict"        : true, // 严格模式 
                // "asi"           : true, // 允许省略分号
                // "noarg"         : true, // 禁止使用arguments.caller和arguments.callee虽然做过一些优化，但是ES5严格模式是禁止的
                // "eqeqeq"        : true, // 禁止使用==和!=赞成===和 !==
                // "undef"         : true, // 禁止使用不在全局变量列表中的未定义变量
                // "curly"         : true, // 循环或者条件语句必须使用花括号包住
                // "freeze"        : true, // 禁止覆盖原生的对象"原型"
                // "funcscope"     : true, // 禁止在控制语句中var变量，并且控制语句外调用这个变量
                // "latedef"       : true, // 禁止在定义之前使用变量，可能会导致一些错误，设置"nofunc" 忽略函数声明
                // "nocomma"       : true, // 禁止使用逗号运算符
                // "nonew"         : true, // 禁止new出的对象不赋值给变量
                // "expr"          : true, // 禁止使用表达式的警告
                // "devel"         : true, // 定义用于调试的全局变量：console,alert 
                // "force"         : true, // JSHint错误，但不会失败任务
                // "quotmark"      : true, // 代码中引号一致性，支持三个参数({true: 随意，但保持一致, "single": "只允许单引号", "double": "只允许双引号"}) (下个版本废弃)
                // "esversion"     : 5,    // 启用ES5.1规范，并允许关键字作为对象属性
                // "maxerr"        : 50,   // 警告信息的最大量，默认50
                // "maxparams"     : 3,    // 允许最大的形式参数的数量
                // "maxstatements" : 5,    // 每个函数允许的最大语句数量
                // "unused"        : "strict",// 检查没有使用的参数，或没有使用的全局变量，清理代码非常有效，设置vars仅检查变量，设置strict检查所有变量和参数
                // "shelljs"       : true, // 使用shelljs公开的全局变量
                "jquery"        : true, // 使用jQuery公开的全局变量
                "browser"       : true, // 暴露新浏览器的全局变量 如old: Window document
                "bitwise"       : true, // 禁止位运算符 ^ | & 比如经常把&&写错& 规避此错误
                "boss"          : true, // 禁止花括号代码块在一行
                "immed"         : true, // 禁止使用即时函数调用(下个版本弃用)
                "evil"          : true, // 禁止使用eval,容易被各种注入攻击，并且难以进行某些优化
                "newcap"        : true, // new 后面构造函数必须大写,为了避免直接使用函数的时候，this指向全局的对象(下个版本弃用)
                "noempty"       : true, // 空的代码块将警告，(下个版本弃用)
                "node"          : true, // 使用在nodeJS运行环境，可以定义node全局变量
                "globals"       : {     // 设置全局变量，true可以读取和写入，false jshint将视为只读
                    $           : false,
                    jQuery      : false
                },
            }
        },



        // CSS Syntax Check
        csslint: {
            files : ['html/**/*.sass'],
            options: {
                "boss": false,
                "curly": true,
                "eqeqeq": true,
                "expr": true,
                "immed": true,
                "newcap": true,
                "noempty": true,
                "noarg": true,
                "undef": true,
                "regexp": true,

                "browser": true,
                "devel": true,
                "node": true
            }
        },

        // sass
        sass: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'html/css/',
                    src: ['*.sass', '*.scss'],
                    dest: 'html/css',
                    ext: '.css'
                }],
                options: {
                    style: 'expanded'
                }
            }
        },



        // Automation
        watch : {
            js: {
                files: ['src/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['html/**/*.css'],
                tasks: ['cssmin'], 
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['**/*.sass', '**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                },
            },
        },


    })



    // Load Npm Task
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');


    // Register Init Task
    grunt.registerTask('default', ['jshint', 'watch']);


}

