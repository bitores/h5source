// 在sails中2和3可以直接添加一个task
module.exports = function(grunt) {

    grunt.config.set('clean', {
      apidoc: {
        myapp: {
          src: "app/",
          dest: "apidoc/"
        }
      }
    });

    grunt.loadNpmTasks('grunt-apidoc');
};