"use strict"

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            compilation: {
                files: {
                    'dev/css/bijiawap.css': 'dev/less/bijiawap.less'
                }
            },
            zip: {
                files: {
                    'public/css/bijiawap.css': 'dev/css/bijiawap.css'
                },
                options: {
                    compress: true,
                    yuicompress:false
                }
            }
        },
        jshint:{
            files: [
                'resources/assets/js/**/*.js',
                'resources/assets/js/controller/*.js',
                'resources/assets/js/Demo/*.js',
                'resources/assets/js/direetives/*.js',
                'resources/assets/js/filters/*.js',
                'resources/assets/js/services/*.js'
                // 'resources/assets/js/*.js'
            ],
            options:{
                
            }
        },
        copy:{
            js:{
                files: [{
                    expand: true,
                    cwd:"dev/js/",
                    src: '**',
                    dest: 'public/js/',
                }],
            },
            img:{
                files: [{
                    expand: true,
                    cwd:"dev/img/",
                    src: '**',
                    dest: 'public/img/'
                   
                }],
            }
        },
        uglify:{
            buildall:{
                options: {
                    mangle: false,
                    preserveComments: false,
                },
                files: [{
                    expand:true,
                    cwd:'dev/js',//js目录下
                    src:[
                        'controller/*.js',
                        'direetives/*.js',
                        'filters/*.js',
                        'services/*.js',
                        '*.js'
                        // 'config.js'
                    ],
                    dest: 'public/js'//输出到此目录下
                }]
            }
        },
        // jshint: {
        //     files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        //     options: {
        //         globals: {
        //             jQuery: true
        //         }
        //     }
        // },
        watch: {
            files: ['dev/js/**','dev/img/**','resources/assets/less/kqcwap.less'],
            // files: ['resources/assets/js/**/*.js','resources/assets/js/*.js','resources/assets/img/**','resources/assets/less/kqcwap.less'],
            tasks: ['copy','less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('watch', ['watch']);
    grunt.registerTask('default', ['copy','uglify:buildall','less']);
};