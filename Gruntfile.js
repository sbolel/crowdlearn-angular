#!/usr/bin/env node
'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      release: ['app/release/vendor.js', 'app/release/<%= pkg.name %>.js'],
      loader: ['app/release/loader.js']
    },

    connect: {
      client: {
        options: {
          port: 9000,
          base: './app',
          livereload: true,
          open: {
            target: 'http://localhost:9000',
            appName: 'Google Chrome',
          }
        }
      }
    },

    cssmin: {
      options: {
        sourceMap: true,
        shorthandCompacting: true
      },
      dev: {
        files: {
          'app/release/app.min.css': [
            'app/assets/css/app.css',
          ]
        }
      },
      vendor: {
        files: {
          'app/release/vendor.min.css': [
            'bower_components/angular-material/angular-material.css',
            'bower_components/Ionicons/css/Ionicons.css'
          ]
        }
      }
    },

    qunit: {
      files: ['test/**/*.html']
    },

    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js'],
      options: {
        globals: {
          angular: true,
          Firebase: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      dev: {
        files: {
          'app/release/<%= pkg.name %>.js': [
            'app/app.js',
            'app/src/home/home.js',
            'app/src/contact/form/form.js',
            'app/src/contact/form/form-controller.js',
            'app/src/contact/form/form-directive.js',
            'app/src/contact/contact.js',
            'app/src/layout/layout.js',
            'app/src/layout/header.js',
            'app/src/layout/header-directive.js',
            'app/src/layout/header-button-directive.js',
            'app/src/layout/footer-directive.js',
            'app/src/questions/questions.js',
          ]
        }
      },
      vendor: {
        files: {
          'app/release/vendor.js': [
            'bower_components/angular/angular.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/firebase/firebase.js',
            'bower_components/angularfire/dist/angularfire.js',
          ]
        }
      // },
      // loader: {
      //   files: {
      //     'app/release/loader.js': [
      //       'bower_components/headjs/dist/1.0.0/head.load.js',
      //       'app/src/utils/loader.js',
      //     ]
      //   }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dev: {
        files: {
          'app/release/<%= pkg.name %>.min.js': ['app/release/<%= pkg.name %>.js']
        }
      },
      vendor: {
        files: {
          'app/release/vendor.min.js': ['app/release/vendor.js']
        }
      },
      loader: {
        files: {
          'app/release/loader.min.js': ['app/release/loader.js']
        }
      }
    },

    watch: {
      html: {
        files: ['app/**/*.html'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['app/**/*.js'],
        // tasks: ['build:dev'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['app/assets/css/*.css'],
        tasks: ['cssmin:dev'],
        options: {
          livereload: true
        }
      },
      bower: {
        files: ['bower.json'],
        tasks:['wiredep']
      }
    },

    wiredep: {
      task: {
        src: ['app/index.html']
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-wiredep');

  grunt.registerTask('build:loader', ['ngAnnotate:loader', 'uglify:loader', 'clean:loader']);
  grunt.registerTask('build:vendor', ['ngAnnotate:vendor', 'uglify:vendor', 'clean:release']);
  grunt.registerTask('build:dev', ['ngAnnotate:dev', 'uglify:dev', 'clean:release']);
  grunt.registerTask('build', ['ngAnnotate', 'uglify', 'clean']);
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('default', ['serve']);

};