AcornTrail.Models.Trail = Backbone.Model.extend({
  urlRoot: '/api/trails',
  trailCoordinates: function () {
    if (!this._trailCoordinates) {
      this._trailCoordinates = new AcornTrail.Collections.TrailCoordinates([],
        { trail: this });
    }

    return this._trailCoordinates;
  },

  author: function () {
    if (!this._author) {
      this._author = new AcornTrail.Models.User();
    }

    return this._author;
  },

  reviews: function () {
    if (!this._reviews) {
      this._reviews = new AcornTrail.Collections.Reviews([],
        { trail: this });
    }

    return this._reviews;
  },

  parse: function (response) {
    if (response.trailCoordinates) {
      this.trailCoordinates().set(response.trailCoordinates, { parse: true });
      delete response.trailCoordinates;
    }
    if (response.reviews) {
      this.reviews().set(response.reviews, { parse: true });
      delete response.reviews;
    }
    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    }
    if (response.trailHead) {
      this.trailHead = response.trailHead;
      delete response.trailHead;
    }
    return response;
  }
});
