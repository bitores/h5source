
module.exports = function(grunt){
	// 配置项目
	grunt.initConfig({
		concat: {
	        //这里是concat任务的配置信息
	        options: {
	        	// banner选项(用于在文件顶部生成一个注释)
	            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
	        },
	        // 源目录  --->>  目标目录
	        build: {
	            src: 'src/js/<%= pkg.name %>.js',
	            dest: 'build/js/<%= pkg.name %>.min.js'
	        }
	    },
	    uglify: {
	        //这里是uglify任务的配置信息
	        front:{
	        	options: {  
                    banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'  
                },
                //添加文字到压缩后的文件尾部  
                footer:'/*! 这是压缩文件尾部 */',  
                //美化代码  
                beautify: {  
                    //中文ascii化，非常有用！防止中文乱码的神配置  
                    ascii_only: true  
                },
		        // 源目录  --->>  目标目录
		        build: {
		            src: 'src/js/<%= pkg.name %>.js',
		            dest: 'build/js/<%= pkg.name %>.min.js'
		        }
	        },
	        backend:{
        		options: {  
                    banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'  
                }
	        }
	    },
	    default: {

	    },
	    //任意非任务特定属性
		// 获取 package.json 的信息
		pkg: grunt.file.readJSON('package.json')
	});

	// 加载任务
	//加载提供“uglify”任务的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// 默认执行的任务 (注意先后顺序)
	grunt.registerTask('default',['uglify']);

	grunt.registerTask('default','',function(){
		console.log('前台js压缩');  
        grunt.task.run('uglify:front');  
        grunt.log.writeln('后台js压缩');  
        grunt.task.run('uglify:backend');
	});
}