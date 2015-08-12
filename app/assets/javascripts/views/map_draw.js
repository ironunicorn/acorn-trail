AcornTrail.Views.MapDraw = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },
  

  render: function () {
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };
    this.trailPath = [];
    this._map = new google.maps.Map(this.el, mapOptions);
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'click', function(event) {
      this.addMarker(event.latLng);
    }.bind(this));
  },

  addMarker: function (location) {
    this.trailPath.push(location);
    var marker = new google.maps.Marker({
      position: location,
      map: this._map
    });
    this.addLines();
  },

  addLines: function () {
    var trailPathLine = new google.maps.Polyline({
      path: this.trailPath,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    trailPathLine.setMap(this._map);
  },

  remove: function () {
    google.maps.event.clearInstanceListeners(this._map);
    Backbone.View.prototype.remove.call(this);
  }
});
