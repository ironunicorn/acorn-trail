AcornTrail.Models.Review = Backbone.Model.extend({
  urlRoot: '/api/reviews',

  reviewAuthor: function () {
    if (!this._reviewAuthor) {
      this._reviewAuthor = new AcornTrail.Model.User();
    }

    return this._reviewAuthor;
  },

  parse: function (response) {
    if (response.reviewAuthor) {
      this.reviewAuthor().set(response.reviewAuthor);
      delete response.reviewAuthor;
    }
    return response;
  }
});
