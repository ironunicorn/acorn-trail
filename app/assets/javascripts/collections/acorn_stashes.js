AcornTrail.Collections.AcornStashes = Backbone.Collection.extend({
  url: function () {
    return this.trail_coord.url() + "/acorn_stash";
  },

  initialize: function (params, options) {
    this.trail_coord = options.trail_coord;
  }

});
