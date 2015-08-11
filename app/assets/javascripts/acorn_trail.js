window.AcornTrail = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#content');
    new AcornTrail.Routers.AcornRouter({ $rootEl: $rootEl });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  AcornTrail.initialize();
});
