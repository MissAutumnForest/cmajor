module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      scripts: {
        files: ["*.js"],
        tasks: ["jshint"]
      },
      html: {
        files: ['*.html']
      },
      css: {
        files: ['*.css']
      }
    },

    jshint: {
      all: {
        src: ["*.js"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};
