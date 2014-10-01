/*\
|*|
|*| This is the task-runner for rabit—It does a bunch of cool shit.
|*| Below you'll see what lines do what and how it effects the theme.
|*|
\*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['assets/sass/**/*.scss'], // Watches for scss file changes in the sass directory
        tasks: ['sass'] // Runs the sass task below if there is a change
      },
      js: {
        files: ['assets/js/scripts/**/*.js', 'package.json'], // Watches for js file changes in the scripts directory and for package.json
        tasks: ['concat', 'uglify'], // Runs the uglify task below if there is a change
        options: {
          livereload: true
        }
      },
      css: {
        files: ['assets/css/*.css', 'assets/components/rabit/**/*.css'], // Getting ready for polymer
        options: {
          livereload: true
        }
      },
      hbs: {
        files: ['**/*.hbs'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        files: {
          'assets/css/style.min.css': 'assets/sass/style.scss' // Compiles your SASS into a nice css file
        },
        options: {
          includePaths: require('node-bourbon').includePaths,
          outputStyle: 'compressed'
        }
      }
    },
    concat: {
      dist: {
        files: {
          'assets/js/rabit.js': ['assets/js/scripts/plugins/*.js', 'assets/js/scripts/scripts.js']
        },
        options: {
          sourceMap: true
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'assets/js/rabit.min.js': ['assets/js/rabit.js'] // Uglifies the concatenated JS file
        },
        options: {
          compress: true,
          mangle: true, // When set to false, it prevents variable/function name changes
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n', // Adds line at the end of the outputted file. The above will output something like /*! rabit - v1.0.0 - 2014-1-1 */
          footer: '\n// Written by <%= pkg.author %>'
        }
      }
    }
  });

  // Load Grunt plugins

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');

  // Create Grunt tasks (running 'grunt' in the command line will run whichever task is titled 'default')

  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']); // This is the default tasks. There are no other tasks because this Gruntfile only does one thing and one thing only.

};
