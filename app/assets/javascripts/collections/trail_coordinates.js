AcornTrail.Collections.TrailCoordinates = Backbone.Collection.extend({
  model: AcornTrail.Models.TrailCoordinate,
  url: function () {
    return this.trail.url() + "/trail_coordinates";
  },

  initialize: function (params, options) {
    if (options && options.trail) {
      this.trail = options.trail
    }
  },

  comparator: function (coord) {
    return coord.get('order');
  },

  toJSON: function(){
    var json = [];
    this.each(function (coord) {
      var model = coord.toJSON();
      if (coord.acornStash().get('title')) {
        model.acorn_stash_attributes = coord.acornStash();
      }
      json.push(model);
    })
    return json;
  }
});
