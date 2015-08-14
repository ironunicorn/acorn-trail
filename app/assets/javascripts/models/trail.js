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

  parse: function (response) {
    if (response.trailCoordinates) {
      this.trailCoordinates().set(response.trailCoordinates, { parse: true });
      delete response.trailCoordinates;
    }
    if (response.author) {
      this.author().set(response.author);
      delete response.author;
    }
    return response;
  },
  //
  // trailHead: function () {
  //   var trail = this;
  //   var collection = this.trailCoordinates();
  //   var trailHead = this.trailCoordinates().findWhere({
  //     order: 0,
  //     trail_id: this.id
  //   });
  //
  //   if (!trailHead) {
  //     trailHead = new AcornTrail.Models.TrailCoordinate({ order: 0 },
  //       { trail: trail }
  //     );
  //     collection.add(trailHead);
  //     trailHead.fetch({
  //       error: function () { collection.remove(trailHead); }
  //     });
  //   } else {
  //     trailHead.fetch();
  //   }
  //
  //   return trailHead;
  // }
});
