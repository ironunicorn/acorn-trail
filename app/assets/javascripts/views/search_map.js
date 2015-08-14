AcornTrail.Views.SearchMap = Backbone.View.extend({
  // Initialization
  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this._markers = {};

    this.listenTo(this.collection, 'add', this.addMarker);
    this.listenTo(this.collection, 'remove', this.removeMarker);
  },

  render: function () {
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };

    this._map = new google.maps.Map(this.el, mapOptions);

    this.collection.each(this.addMarker.bind(this));
    this.attachMapListeners();
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'idle', this.search.bind(this));
  },

  // Event handlers
  addMarker: function (trail) {
    if (this._markers[trail.id]) { return };
    var view = this;

    var marker = new google.maps.Marker({
      position: { lat: parseFloat(trail.trailHead.latitude), lng: parseFloat(trail.trailHead.longitude) },
      map: this._map,
      model: trail,
      icon: "http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png"
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this._markers[trail.id] = marker;
  },

  search: function () {
    // This method will re-fetch the map's collection, using the
    // map's current bounds as constraints on latitude/longitude.

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
    var marker = this._markers[trail.id];
    marker.setMap(null);
    delete this._markers[trail.id];
  },

  showMarkerInfo: function (event, marker) {
    // This event will be triggered when a marker is clicked. Right now it
    // simply opens an info window with the title of the marker. However, you
    // could get fancier if you wanted (maybe use a template for the content of
    // the window?)
    var searchItem = new AcornTrail.Views.SearchItem({
      model: marker.model
    });

    // this._subviews.push("searchItem")

    var infoWindow = new google.maps.InfoWindow({
      content: searchItem.render().el
    });

    infoWindow.open(this._map, marker);
  },
});
  //
  // startBounce: function (id) {
  //   var marker = this._markers[id];
  //   marker.setAnimation(google.maps.Animation.BOUNCE);
  // },
  //
  // stopBounce: function (id) {
  //   var marker = this._markers[id];
  //   marker.setAnimation(null);
  // }
