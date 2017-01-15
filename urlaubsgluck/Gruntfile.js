module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'src/js/jquery-1.9.1.js',
          'src/js/jquery.xdomainrequest.min.js',
          'src/js/jquery.jcarousel.js',
          'src/js/jcarousel.basic.js',
          'src/js/isotope.pkgd.min.js',
          'src/js/tmpl.js',
          'src/js/script.js',
          'src/js/*.js'

        ],
        dest: 'dest/js/build/production.js',
      }
    },

    uglify: {
      build: {
        src: 'dest/js/build/production.js',
        dest: 'dest/js/build/production.min.js'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dest/img/'
        }]
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/scss',
          src: ['*.scss'],
          dest: 'src/css',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      with_banner: {
        options: {
          banner: '/* My minified CSS Artem */'
        },

        files: {
          'dest/css/style.min.css': ['src/css/*.css']
        }
      }
    },
    watch: {
      sass: {
        files: ['src/scss/*.scss'],
        tasks: ['sass'],
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['src/css/*.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false
        }
      }
    }



  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'sass', 'cssmin']);

};