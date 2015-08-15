AcornTrail.Models.Review = Backbone.Model.extend({
  urlRoot: '/api/reviews',

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
