Grunt File Config文件

1、src 
	值可以是字符串或数组
2、files
	值可以是字符串或数组
3、options
	在一个任务配置中,options属性可以用来指定覆盖内置属性的默认值。此外，每一个任务目标中更具体的目标都可以拥有一个options属性。目标级的选项将会覆盖任务级的选项（就近原则——options离目标越近，其优先级越高）。

	options对象是可选，如果不需要，可以省略。
4、tasks
	任务依赖，与requirejs中模块依赖相似
5、filter

6、动态文件对象
expand设置true用于启用下面的选项：
cwd相对于当前路径所匹配的所有src路径(但不包括当前路径。)
src相对于cwd路径的匹配模式。
dest目标文件路径前缀。
ext使用这个属性值替换生成的dest路径中所有实际存在文件的扩展名(比如我们通常将压缩后的文件命名为.min.js)。
grunt.initConfig({
    minify: {
        dynamic_mappings: {
            //当'minify'任务运行时Grunt将自动在"lib/"下搜索"**/*.js", 然后构建适当的src-dest文件映射，因此你不需要在文件添加或者移除时更新Gruntfile
            files: [
                {
                    expand: true, //启用动态扩展
                    cwd: 'lib/', //批匹配相对lib目录的src来源
                    src: '**/*.js', //实际的匹配模式
                    dest: 'build/', //目标路径前缀
                    ext: '.min.js' //目标文件路径中文件的扩展名.
                }
            ]
        }
    }
});


通配符模式
当然这并不是一个综合的匹配模式方面的教程，你只需要知道如何在文件路径匹配过程中使用它们即可：

 *匹配任意数量的字符，但不匹配/
 ?匹配单个字符，但不匹配/
 **匹配任意数量的字符，包括/，只要它是路径中唯一的一部分
 {}允许使用一个逗号分割的列表或者表达式
 !在模式的开头用于否定一个匹配模式(即排除与模式匹配的信息)
大多数的人都知道foo/*.js将匹配位于foo/目录下的所有的.js结尾的文件, 而foo/**/*js将匹配foo/目录以及其子目录中所有以.js结尾的文件。

此外, 为了简化原本复杂的通配符模式，Grunt允许指定一个数组形式的文件路径或者一个通配符模式。模式处理的过程中，带有!前缀模式不包含结果集中与模式相配的文件。 而且其结果集也是唯一的。

示例：

//可以指定单个文件
{src: 'foo/this.js', dest: …}
//或者指定一个文件数组
{src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: …}
//或者使用一个匹配模式
{src: 'foo/th*.js', dest: …}

//一个独立的node-glob模式
{src: 'foo/{a,b}*.js', dest: …}
//也可以这样编写
{src: ['foo/a*.js', 'foo/b*.js'], dest: …}

//foo目录中所有的.js文件，按字母排序
{src: ['foo/*js'], dest: …}
//这里首先是bar.js，接着是剩下的.js文件按字母排序
{src: ['foo/bar.js', 'foo/*.js'], dest: …}

//除bar.js之外的所有的.js文件，按字母排序
{src: ['foo/*.js', '!foo/bar.js'], dest: …}
//所有.js文件按字母排序, 但是bar.js在最后.
{src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: …}

//模板也可以用于文件路径或者匹配模式中
{src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}
//它们也可以引用在配置中定义的其他文件列表
{src: ['foo/*.js', '<%= jshint.all.src %>'], dest: …}
可以在node-glob和minimatch文档中查看更多的关于通配符模式的语法。
....

简洁格式
这种形式允许每个目标对应一个src-dest文件映射。
通常情况下它用于只读任务，
比如grunt-contrib-jshint,
它就只需要一个单一的src属性，
而不需要关联的dest选项。
1、只需要一个单一的src属性，不需要关联的dest选项
grunt.initConfig({
    jshint: {
        src: ['src/js/a.js','src/js/aa.js']
    }
});

2、允许每个目标对应一个src-dest文件映射
 2.1 文件数组格式
grunt.initConfig({
    concat: {
        foo: {
            files: [
                {src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
                {src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'}
            ]
        }
    }
});

 2.2 文件对象格式
grunt.initConfig({
    concat: {
        foo: {
            files: {
                'dest/a.js': ['src/aa.js', 'src/aaa.js'],
                'dest/a1.js': ['src/aa1.js', 'src/aaa1.js']
            }
        }
    }
});




以上参数可以在任一任务中组合，例如
task1:{
	options: {
      // 这里是任务级的Options，覆盖任务的默认值 
    },
	task2:{
		options: {
      // 这里是任务级的Options，覆盖任务的默认值 
        },
		task3:{
			files: '',
        	tasks: []
		}
	}
}

eg.
/*global module:false*/
module.exports = function(grunt) {

  // 项目配置.
  grunt.initConfig({
    // 任务配置.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'nodeunit']
      }
    }
  });

  // 加载任务.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 默认执行的任务.
  grunt.registerTask('default', ['jshint', 'nodeunit']);

};