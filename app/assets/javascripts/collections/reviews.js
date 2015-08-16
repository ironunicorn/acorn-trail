AcornTrail.Collections.Reviews = Backbone.Collection.extend({
  url: function () {
    return this.trail.url() + "/reviews";
  },
  initialize: function (params, options) {
    this.trail = options.trail
  },
  model: AcornTrail.Models.Review,
  comparator: function (review) {
    return review.get('created_at')
  }

})
