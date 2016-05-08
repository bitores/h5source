'use strict';
module.exports = function( grunt ){
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var config = {
		app: 'app',
		dist: 'dist'
	};

	grunt.initConfig({
		config: config,
		uglify:{
			files:[
				'<%= config.dist %>/index.html':'<%= config.app %>/index.html',
				'<%= config.dist %>/index.js':'<%= config.app %>/index.js'
			]
		},
		copy: {
			dist_html:{
				src:'<%= config.app %>/index.html',
				dest:'<%= config.dist %>/index.html'
			},
			dist_js:{
				files:[{
					// 开启动态文件处理
					expand: true,
					cwd: '<%= config.app %>/',
					src: '**/*.js',
					dest:'<%= config.dist %>/',
					ext: '.js',
					extDot:'last',
					flatten: true,
					rename: function(dest, src) {
						return dest + 'js/' + src;
					}
				}]
			}
		},
		clean:{
			dist:[
				src:['<%= config.dist%>/**/*'],
				filter:function(filepath){//值为fs 中 state的函数名，如isFile或自定义函数名
					return (!grunt.file.isDir(filepath))
				},
				// expand: true// 处理动态文件
				matchBase:true
			]
		}
	});

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');


	grunt.registerTask('p0',[
		'uglify'
	],function(){
		if(grunt.option('allow-remote')){

		}

		if(target === 'dist') {
			return grunt.task.run(['copy','clean'])
		}

		grunt.task.run([
			'uglify',
			'copy',
			'clean'
		])
	})

	grunt.registerTask('default', ['uglify','copy','clean']);

}