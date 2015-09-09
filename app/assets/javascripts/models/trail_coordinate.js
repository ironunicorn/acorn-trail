AcornTrail.Models.TrailCoordinate = Backbone.Model.extend({
  urlRoot: function () {
    return this.trail.url() + "/trail_coordinates";
  },

  initialize: function (params, options) {
    if (options && options.trail) {
      this.trail = options.trail;
    }
  },

  acornStash: function () {
    if (!this._acornStash) {
      this._acornStash = new AcornTrail.Models.AcornStash();
    }

    return this._acornStash;
  },

  parse: function (response) {
    if (response.acornStash) {
      this.acornStash().set(response.acornStash);
      delete response.acornStash;
    }
    return response;
  }
});
