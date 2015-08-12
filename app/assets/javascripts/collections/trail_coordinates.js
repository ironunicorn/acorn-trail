AcornTrail.Collections.TrailCoordinates = Backbone.Collection.extend({
  model: AcornTrail.Models.TrailCoordinate,
  url: function () {
    return this.trail.url() + "/trail_coordinates";
  },
  initialize: function (models, options) {
    this.trail = options.trail;
  }

});
