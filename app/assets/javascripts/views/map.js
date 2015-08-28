AcornTrail.Views.Map = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  render: function () {
    var location = { lat: 37.7833, lng: -122.4167 }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (position.coords.latitude) {
          location = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          )
        }
      })
    }

    var mapOptions = {
      center: location,
      zoom: 13,
      disableDefaultUI: true,
      minZoom: 10
    };

    this._map = new google.maps.Map(this.el, mapOptions);

    var remove_poi = [
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
          { "visibility": "off" }
        ]
      }
    ]
    this._map.setOptions({styles: remove_poi});

    var allowedBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.303245, -122.807137),
      new google.maps.LatLng(38.006680, -121.852699)
    );
    var lastValidCenter = this._map.getCenter();

    google.maps.event.addListener(this._map, 'center_changed', function() {
      if (allowedBounds.contains(this._map.getCenter())) {
        lastValidCenter = this._map.getCenter();
        return;
      }

      this._map.panTo(lastValidCenter);
    }.bind(this));

  }


});
