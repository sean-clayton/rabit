module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    git_changelog: {
      minimal: {
        options: {
          repo_url: 'git@skulbuny.com:sean/rabit.git',
          appName : 'Git changelog',
          file: 'CHANGELOG.md'
        }
      },
      extended: {
        options: {
          repo_url: 'https://github.com/rafinskipg/git-changelog',
          appName: 'Git changelog extended',
          file: 'EXTENDEDCHANGELOG.md',
          grep_commits: '^fix|^feat|^docs|^refactor|^chore|BREAKING'
        }
      }
    },
    watch: {
      files: ['assets/sass/*.scss'],
      tasks: ['sass']
    }
  });

  grunt.loadNpmTasks('git-changelog');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('changelog', ['git_changelog']);

};