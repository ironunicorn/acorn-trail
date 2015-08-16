AcornTrail.Collections.TrailFeed = Backbone.Collection.extend({
  url: '/api/trails/feed',
  model: AcornTrail.Models.Trail
})
