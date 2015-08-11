AcornTrail.Views.MapDraw = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  render: function () {
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };
    this.labelIndex = 0;
    this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.trail_coordinates = [];

    this._map = new google.maps.Map(this.el, mapOptions);
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'click', function(event) {
      this.trail_coordinates.push([event.latLng.G, event.latLng.K]);
      this.addMarker(event.latLng);
    }.bind(this));
  },

  addMarker: function (location) {
    var marker = new google.maps.Marker({
      position: location,
      label: this.labels[this.labelIndex++ % this.labels.length],
      map: this._map
    });
  }
});
