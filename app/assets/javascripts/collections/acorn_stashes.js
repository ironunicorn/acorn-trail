AcornTrail.Collections.AcornStashes = Backbone.Collection.extend({
  url: '/api/acorn_stash',
  model: AcornTrail.Models.AcornStash,
  initialize: function (models, options) {
    if (options) {
      this.coord = options.coord;
    }
  }
});
