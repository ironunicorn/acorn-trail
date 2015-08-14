AcornTrail.Collections.TrailSearch = Backbone.Collection.extend({
  url: '/api/trails/search',
  model: AcornTrail.Models.Trail
})
