AcornTrail.Models.Review = Backbone.Model.extend({
  urlRoot: function () {
    return this.trail.url() + "/reviews";
  },

  initialize: function (params, options) {
    this.trail = options.trail;
  },

  parse: function (response) {
    if (response.reviewAuthor) {
      this.reviewAuthor().set(response.reviewAuthor);
      delete response.reviewAuthor;
    }
    return response;
  },

  reviewAuthor: function () {
    if (!this._reviewAuthor) {
      this._reviewAuthor = new AcornTrail.Models.User();
    }

    return this._reviewAuthor;
  }
});
