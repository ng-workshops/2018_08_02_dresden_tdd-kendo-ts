// Requirejs Configuration Options
require.config({
  // to set the default folder
  baseUrl: '../src',
  // paths: maps ids with paths (no extension)
  paths: {
    jasmine: ['../tests/lib/jasmine'],
    'jasmine-html': ['../tests/lib/jasmine-html'],
    'jasmine-boot': ['../tests/lib/boot'],
    jquery: '../libs/jquery',
    jszip: '../libs/jszip.min',
    'kendo.all.min': '../libs/kendo.all.min',
    kendo: '../libs/kendo.all.min',
    tslib: '../node_modules/tslib/tslib'
  },
  // shim: makes external libraries compatible with requirejs (AMD)
  shim: {
    'jasmine-html': {
      deps: ['jasmine']
    },
    'jasmine-boot': {
      deps: ['jasmine', 'jasmine-html']
    },
    kendo: {
      deps: ['jquery'],
      exports: 'kendo'
    },
    tslib: { deps: [] }
  }
});

var DEPENDENCIES = ['jquery', 'jszip', 'kendo.all.min'];
var SPECS = ['index.spec', 'form/form.model.spec', 'validation/validation.spec'];

require(['jasmine-boot'], function() {
  require(DEPENDENCIES, function() {
    require(SPECS, function() {
      //trigger Jasmine
      window.onload();
    });
  });
});
