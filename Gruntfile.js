module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            scripts: {
                files: ["Gruntfile.js", "index.js", "test.js", "includes/**/*.js"],
                tasks: ["clear", "jslint"]
            },
            html: {
                files: ["clear", 'app/**/*.html']
            },
            css: {
                files: ["clear", 'app/**/*.css']
            }
        },

        jslint: {
            all: {
                src: ["index.js", "test.js", "includes/**/*.js"],
                directives: {
                    node: true,
                    stupid: true,
                    todo: true,
                    unparam: true,
                    nomen: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-clear');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
        'jslint',
        'watch'
    ]);
};
