AcornTrail.Views.TrailMap = Backbone.View.extend({

  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.addlines);
  },

  render: function (options) {
    this.collection = options.collection;
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };
    this._map = new google.maps.Map(this.el, mapOptions);
    this.addLines();
  },


  addLines: function () {
    var trailPathLine = new google.maps.Polyline({
      path: this.route(),
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    trailPathLine.setMap(this._map);
  },

  route: function () {
    this._route = []
    this.collection.each(function (coord) {
      this._route.push(new google.maps.LatLng(
        coord.get('latitude'),
        coord.get('longitude')
      ));
    }.bind(this))

    return this._route
  }

});
