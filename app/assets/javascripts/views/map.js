AcornTrail.Views.Map = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  render: function () {
    var location = { lat: 37.7833, lng: -122.4167 }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        if (position.coords.latitude) {
          var location = new google.maps.LatLng(
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
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      }
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

    this._map.setOptions({styles: remove_poi})
  }
});
