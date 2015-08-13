AcornTrail.Collections.TrailCoordinates = Backbone.Collection.extend({
  model: AcornTrail.Models.TrailCoordinate,
  url: function () {
    return this.trail.url() + "/trail_coordinates";
  },
  comparator: function (coord) {
    return coord.get('order');
  }

});
