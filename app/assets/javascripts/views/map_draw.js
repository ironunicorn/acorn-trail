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
    this.markersAndLines = [];
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
      map: this._map,
      icon: "http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png",
      suppressInfoWindows: true
    });
    this.markersAndLines.push(marker)
    this.addLines();
  },

  addLines: function () {
    var trailPathLine = new google.maps.Polyline({
      path: this.trailPath,
      geodesic: true,
      strokeColor: '#664116',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this.markersAndLines.push(trailPathLine);
    trailPathLine.setMap(this._map);
  },

  removeMarkers: function () {
    this.trailPath = [];
    this.markersAndLines.forEach(function (marker) {
      marker.setMap(null);
    });
    this.markersAndLines = [];
  },

  remove: function () {
    google.maps.event.clearInstanceListeners(this._map);
    Backbone.View.prototype.remove.call(this);
  }
});
