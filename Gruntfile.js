module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['assets/sass/*.scss'],
      tasks: ['sass']
    },
    sass: {
      dist: {
        files: {
          'assets/css/style.css': 'assets/sass/style.scss'
        },
        options: {
          outputStyle: 'compressed'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('dev', ['sass', 'watch']);

};