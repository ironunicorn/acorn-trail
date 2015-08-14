AcornTrail.Models.Review = Backbone.Model.extend({
  urlRoot: '/api/reviews',

  parse: function (response) {
    if (response.reviewAuthor) {
      this.reviewAuthor = response.reviewAuthor;
      delete response.reviewAuthor;
    }
    return response;
  }
});
