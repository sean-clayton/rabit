module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['assets/sass/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['assets/js/scripts/*.js'],
        tasks: ['uglfiy']
      }
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
    },
    uglify: {
      dist: {
        files: {
          'assets/js/rabit.min.js': ['assets/js/scripts/*.js']
        },
        options: {
          compress: true,
          mangle: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('dev', ['uglify', 'sass', 'watch']);

};
