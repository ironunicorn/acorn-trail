AcornTrail.Collections.Trails = Backbone.Collection.extend({
  url: '/api/trails',
  model: AcornTrail.Models.Trail,
  // comparator: function () {
  //   this will host my feed logic.
  // },
  getOrFetch: function (id) {
    var trails = this;
    var trail = this.get(id);
    if (!trail) {
      trail = new AcornTrail.Models.Trail({ id: id });
      this.add(trail);
    }
    trail.fetch({ error: function () { trails.remove(trail); } });

    return trail;
  }
});
