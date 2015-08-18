AcornTrail.Views.AcornMap = Backbone.CompositeView.extend({
  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.addlines);
    this.markers = [];
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'click', function(event) {
      this.addMarker(event.latLng);
    }.bind(this));
  },

  addMarker: function (location) {
    var options = this.locateNearestMarker(location);
    var marker = null;
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].infoWindow.close();
      if (!this.markers[i].void && this.markers[i].position.G === options.coords.G &&
        this.markers[i].position.K === options.coords.K) {
        marker = this.markers[i];
      };
    }
    if (!marker) {
      var acornStash = new AcornTrail.Models.AcornStash();
      var content = new AcornTrail.Views.AcornStashForm({
        model: acornStash,
        trail_coordinate_id: options.trail_coordinate_id,
        map: this
      });
      content.render();
      var infoWindow = new google.maps.InfoWindow({
        content: content.el,
      });
      var marker = new google.maps.Marker({
        position: options.coords,
        map: this._map,
        icon: "http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png",
        infoWindow: infoWindow,
        view: content
      });
      content.marker = marker;
      this.markers.push(marker);
      marker.setMap(this._map);
      google.maps.event.addListener(marker, 'click', function (event) {
        for (var i = 0; i < this.markers.length; i++) {
          this.markers[i].infoWindow.close();
        }
        infoWindow.open(this._map, marker);
      }.bind(this));
    }
    marker.view.render();
    marker.infoWindow.open(this._map, marker);
  },

  locateNearestMarker: function (location) {
    var best = '';
    var coords = null;
    var trail_coordinate_id = null;
    this.collection.each( function (model) {
      var latDiff = Math.pow((model.get('latitude') - location.G), 2);
      var lngDiff = Math.pow((model.get('longitude') - location.K), 2);
      if (best === '') {
        best = Math.sqrt(latDiff + lngDiff);
        coords = new google.maps.LatLng(
          model.get('latitude'),
          model.get('longitude')
        );
        trail_coordinate_id = model.get('id');
      } else {
        var potential = Math.sqrt(latDiff + lngDiff);
        if (best > potential) {
          best = potential;
          coords = new google.maps.LatLng(
            model.get('latitude'),
            model.get('longitude')
          );
          trail_coordinate_id = model.get('id');
        }
      }
    }.bind(this));
    return { coords: coords, trail_coordinate_id: trail_coordinate_id };;
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
      var location = new google.maps.LatLng(
        coord.get('latitude'),
        coord.get('longitude')
      );
      this._route.push(location);
      if (coord.get('order') === 0) {
        this._map.setCenter(location);
      }
    }.bind(this))

    return this._route;
  },


});
