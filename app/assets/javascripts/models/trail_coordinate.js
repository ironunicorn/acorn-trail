AcornTrail.Models.TrailCoordinate = Backbone.Model.extend({
  urlRoot: function () {
    return this.trail.url() + "/trail_coordinates";
  },
  initialize: function (params, options) {
    this.trail = options.trail;
  }
});
