AcornTrail.Views.TrailMap = Backbone.View.extend({

  attributes: {
    id: "map-canvas"
  },

  render: function (options) {
    this.collection = options.collection;
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };
    this._map = new google.maps.Map(this.el, mapOptions);
    this.labelIndex = 1;
    this.addLinesAndAcorns();
  },

  addLinesAndAcorns: function () {
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
      )
      if (coord.get('order') === 0) {
        this._map.setCenter(location);
      }

      this._route.push(location);
      coord.acornStash().get('title') && this.addMarker(location, coord.acornStash());
    }.bind(this))

    return this._route
  },


  addMarker: function (location, acornStash) {
    var acornView = new AcornTrail.Views.AcornStashItem({
      model: acornStash
    });
    var infowindow = new google.maps.InfoWindow({
      content: acornView.el
    });
    acornView.render();
    var marker = new google.maps.Marker({
      position: location,
      map: this._map,
      infowindow: infowindow,
      icon: "http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png"
    });
    marker.setMap(this._map);
    marker.addListener('mouseover', function() {
      infowindow.open(this._map, marker);
    }.bind(this));
  },

});
