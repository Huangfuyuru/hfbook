
module.exports = function (grunt) {
  grunt.initConfig({
    cssmin: {
      files: {
        expand: true,
        cwd: '_book',
        src: ['gitbook/**/*.css'],
        dest: 'dist/'
      }
    }
   
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('minify', ['cssmin']);
};
