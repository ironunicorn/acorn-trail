AcornTrail.Models.Trail = Backbone.Model.extend({
  urlRoot: '/api/trails',
  trailCoordinates: function () {
    if (!this._trailCoordinates) {
      this._trailCoordinates = new AcornTrail.Collections.TrailCoordinates([],
        { trail: this });
    }

    return this._trailCoordinates;
  },


  parse: function (response) {
    if (response.trailCoordinates) {
      this.trailCoordinates().set(response.trailCoordinates, { parse: true });
      delete response.trailCoordinates;
    }
    return response;
  }
});
