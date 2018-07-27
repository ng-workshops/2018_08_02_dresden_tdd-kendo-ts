require.config({
  paths: {
    jquery: '../libs/jquery',
    jszip: '../libs/jszip.min',
    'kendo.all.min': '../libs/kendo.all.min',
    kendo: '../libs/kendo.all.min',
    tslib: '../node_modules/tslib/tslib'
  },
  shim: {
    kendo: {
      deps: ['jquery'],
      exports: 'kendo'
    },
    tslib: { deps: [] }
  }
});
