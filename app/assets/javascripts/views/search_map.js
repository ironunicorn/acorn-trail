AcornTrail.Views.SearchMap = Backbone.View.extend({
  template: JST['trail_search'],

  initialize: function (options) {
    this._markers = {};
    this._map = options.map._map;
    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  render: function () {
    this.$el.html(this.template());
    this.collection.each(this.addMarker.bind(this));
    this.attachMapListeners();

    this.autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
          document.getElementById('autocomplete')),
        { types: ['(cities)'], componentRestrictions: {'country': 'us'} }
    );
    new google.maps.places.PlacesService(this._map);
    this.autocomplete.addListener('place_changed', this.onPlaceChanged.bind(this));
  },

  onPlaceChanged: function () {
    var place = this.autocomplete.getPlace();
    if (place.geometry) {
      this._map.panTo(place.geometry.location);
      this._map.setZoom(13);
      this.search();
    } else {
      document.getElementById('autocomplete').placeholder = 'Search by city';
    }
  },


  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
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
      infoWindow: infoWindow
    });

    google.maps.event.addListener(marker, 'click', function (event) {
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
});
