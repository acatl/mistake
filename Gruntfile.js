'use strict';

function getCLOption(grunt, options) {
  var optionValue = false;
  options.forEach(function(option) {
    optionValue = optionValue || grunt.option(option);
  });

  var value = optionValue || false;
  value = (value === true) || (value === 'on');

  return value;
}

module.exports = function(grunt) {

  var inspect = getCLOption(grunt, ['i', 'inspect']);

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      src: [
        'Gruntfile.js',
        'index.js',
        'test/**/*.js',
        'lib/**/*.js'
      ],
      options: {
        config: '.jscsrc',
        verbose: true
      }
    },
    jshint: {
      src: [
        'Gruntfile.js',
        'index.js',
        'test/**/*.js',
        'lib/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    umd: {
      mistake: {
        src: 'lib/mistake.js',
        dest: 'dist/mistake.js',
        objectToExport: 'mistake',
        globalAlias: 'mistake',
        indent: '    '
      }
    },

    uglify: {
      options: {
        mangle: false,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> ' +
          '©<%= grunt.template.today("yyyy")%>-<%= ((grunt.template.today("yyyy")*1)+3) %> Acatl Pacheco <acatl.pacheco@gmail.com> MIT Licensed */\n'
      },
      mistakeBrowser: {
        files: {
          'dist/mistake.min.js': ['dist/mistake.js']
        }
      }
    },

    mochacli: {
      options: {
        require: ['should'],
        reporter: 'dot',
        'debug-brk': inspect
      },
      all: [
        'test/index.js'
      ]
    },
    watch: {
      scripts: {
        files: [
          'Gruntfile.js',
          'index.js',
          'test/**/*.js',
          'test/**/*.json',
          'lib/**/*.js'
        ],
        tasks: ['newer:jscs', 'newer:jshint', 'umd', 'newer:mochacli', 'newer:uglify'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-umd');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('default', ['jscs', 'jshint', 'umd', 'mochacli', 'uglify']);
  grunt.registerTask('dev', ['jscs', 'jshint', 'umd', 'mochacli', 'uglify', 'watch']);

};
