
module.exports = function(grunt){

  grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  //sass task
  sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/stylesheets/style.css': 'build/sass/main.scss',
          'public/stylesheets/checkout.css': 'build/sass/checkout.scss',
          //'widgets.css': 'widgets.scss'
        }
      }
    },

  //autoprefixer task
  autoprefixer:{
    options:{
        // We need to `freeze` browsers versions for testing purposes.
        browsers: ['opera 12', 'ff 15', 'chrome 25']
    },

     main_css: {
      src: 'public/stylsheets/css/style.css',
      dest: '/public/styesheets/css/style.css'
    }
  },



  //watch tasks
  watch: {
    options:{
      livereload:false
    },
    scss: {
      files: ['build/sass/**/*'],
      tasks: ['sass','autoprefixer']
    },

  }
});

grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-browser-sync');



grunt.registerTask('default', ['watch']);
grunt.registerTask('call_sass', 'sass');
}
