AcornTrail.Collections.Reviews = Backbone.Collection.extend({
  url: '/api/reviews',
  model: AcornTrail.Models.Review,
  comparator: function (review) {
    return review.get('created_at')
  }

})
