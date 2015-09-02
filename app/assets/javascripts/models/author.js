AcornTrail.Models.Author = Backbone.Model.extend({
  urlRoot: '/api/authors',
  trails: function () {
    if (!this._trails) {
      this._trails = new AcornTrail.Collections.Trails();
    }

    return this._trails;
  },
  parse: function (response) {
    if (response.trails) {
      this.trails().set(response.trails, { parse: true });
      delete response.trails;
    }

    return response;
  }
});
