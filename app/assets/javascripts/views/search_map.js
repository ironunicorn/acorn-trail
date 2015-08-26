AcornTrail.Views.SearchMap = Backbone.View.extend({
  template: JST['search_map'],

  initialize: function (options) {
    this._markers = {};
    this._map = options.map._map;
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  render: function () {
    // var mapOptions = {
    //   zoom: 13,
    //   disableDefaultUI: true,
    //   minZoom: 10
    // };
    // this._map.setOptions(mapOptions)
    var view = this;
    this.$el.html(this.template());
    var navigation = new AcornTrail.Views.Navigation();
    $('.navigation').html(navigation.render().$el);
    this.collection.each(this.addMarker.bind(this));
    this.attachMapListeners();
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.303245, -122.807137),
      new google.maps.LatLng(38.006680, -121.852699)
    );
    this.autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
          document.getElementById('autocomplete')),
        { types: [], bounds: defaultBounds, componentRestrictions: {'country': 'us'} }
    );
    new google.maps.places.PlacesService(this._map);
    this.autocomplete.addListener('place_changed', this.onPlaceChanged.bind(this));
  },

  onPlaceChanged: function () {
    var place = this.autocomplete.getPlace();
    if (place.geometry && place.geometry.location.lat() < 38.006680 &&
      place.geometry.location.lat() > 37.303245 && place.geometry.location.lng() > -122.807137 &&
        place.geometry.location.lng() < -121.852699) {
      this._map.panTo(place.geometry.location);
      this.search();
    } else {
      document.getElementById('autocomplete').value = '';
      document.getElementById('autocomplete').placeholder = 'Enter a place in Bay Area';
    }
  },


  attachMapListeners: function () {
    this.mapListener = google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
    this.mapListener = google.maps.event.addListener(this._map, 'click', function() {
      _(this._markers).each( function (marker) {
        marker.infoWindow.close();
      })
    }.bind(this));
  },

  // Event handlers
  addMarker: function (trail) {
    if (this._markers[trail.get('id')]) { return };
    var searchItem = new AcornTrail.Views.SearchItem({
      model: trail
    });


    var infoWindow = new google.maps.InfoWindow({
      content: searchItem.render().el
    });

    var marker = new google.maps.Marker({
      position: { lat: trail.trailHead.latitude, lng:trail.trailHead.longitude },
      map: this._map,
      model: trail,
      icon: "http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png",
      infoWindow: infoWindow,
      id: trail.get('id')
    });
    google.maps.event.addListener(marker, 'mouseover', function (event) {
      _(this._markers).each( function (marker) {
        marker.infoWindow.close();
      });

      infoWindow.open(this._map, marker);
    }.bind(this));

    this._markers[trail.id] = marker;
  },

  search: function () {
    var mapBounds = this._map.getBounds();
    var ne = mapBounds.getNorthEast();
    var sw = mapBounds.getSouthWest();

    var filterData = {
      lat: [sw.lat(), ne.lat()],
      lng: [sw.lng(), ne.lng()]
    };

    this.collection.fetch({
      data: { filter_data: filterData }
    });
  },

  removeMarker: function (trail) {
    var marker = this._markers[trail.get('id')];
    marker.setMap(null);
    delete this._markers[trail.get('id')];
  },

  remove: function () {
    _(this._markers).each(function (marker) {
      marker.setMap(null);
      google.maps.event.clearInstanceListeners(marker);
    });
    google.maps.event.clearInstanceListeners(this.autocomplete);
    google.maps.event.removeListener(this.mapListener);
    Backbone.View.prototype.remove.call(this);
  }
});
