AcornTrail.Collections.TrailCoordinates = Backbone.Collection.extend({
  url: '/api/trail_coordinates',
  model: AcornTrail.Models.TrailCoordinate,
  comparator: function (trail_coordinate) {
    return trail_coordinate.get('order');
  },
  getOrFetch: function (id) {
    var trail_coordinates = this;
    var trail_coordinate = this.get(id);
    if (!trail_coordinate) {
      trail_coordinate = new AcornTrail.Models.TrailCoordinate({ id: id });
      this.add(trail_coordinate);
    }
    trail_coordinate.fetch({
      error: function () { trail_coordinates.remove(trail_coordinate); }
    });

    return trail_coordinate;
  }
});
