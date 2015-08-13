AcornTrail.Views.AcornMap = Backbone.CompositeView.extend({
  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.addlines);
    this.trail_coordinate_id;
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'click', function(event) {
      this.addMarker(event.latLng);
    }.bind(this));
  },

  addMarker: function (location) {
    this.marker && this.marker.setMap(null);
    var marker = new google.maps.Marker({
      position: this.locateNearestMarker(location),
      map: this._map
    });
    this.marker = marker;
    this.marker.setMap(this._map);
  },


  render: function (options) {
    this.collection = options.collection;
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };
    this._map = new google.maps.Map(this.el, mapOptions);
    this.addLines();
    this.attachMapListeners();
  },

  addLines: function () {
    var trailPathLine = new google.maps.Polyline({
      path: this.route(),
      geodesic: true,
      strokeColor: '#664116',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    trailPathLine.setMap(this._map);
  },

  route: function () {
    this._route = [];
    this.collection.each(function (coord) {
      this._route.push(new google.maps.LatLng(
        coord.get('latitude'),
        coord.get('longitude')
      ));
    }.bind(this))

    return this._route;
  },

  locateNearestMarker: function (location) {
    var best = '';
    var coords = [];
    this.collection.each( function (model) {
      var latDiff = Math.pow((model.get('latitude') - location.G), 2);
      var lngDiff = Math.pow((model.get('longitude') - location.K), 2);
      if (best === '') {
        best = Math.sqrt(latDiff + lngDiff);
        coords = new google.maps.LatLng(
          model.get('latitude'),
          model.get('longitude')
        );
        this.trail_coordinate_id = model.get('id');
      } else {
        var potential = Math.sqrt(latDiff + lngDiff);
        if (best > potential) {
          best = potential;
          coords = new google.maps.LatLng(
            model.get('latitude'),
            model.get('longitude')
          );
          this.trail_coordinate_id = model.get('id');
        }
      }
    }.bind(this));
    return coords;
  }
});
