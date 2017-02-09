requirejs.config({
  paths: {
    'ajax': 'ajax'
  },
  shim: {
    'ajax': {
      exports: 'ajax'
    }
  }
});

require(
  ['preventDefault', 'ajax', 'model', 'view', 'controller'],
  function(preventDefault, ajax, Model, View, Controller) {
    ajax(50, function(response) {
      init(response.photos.photo)
    });

    function init(photos) {
      let model = new Model(photos);
      let view = new View(model);
      let controller = new Controller(model, view);
    }
  }
);