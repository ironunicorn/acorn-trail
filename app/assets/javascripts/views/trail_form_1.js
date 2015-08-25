AcornTrail.Views.TrailForm1 = Backbone.CompositeView.extend({
  template: JST['trail_form_1'],

  initialize: function (options) {
    this._map = options.map;
    $(document).on('keyup', this.handleKey.bind(this));
  },

  events: {
    'click .m-background': 'remove',
    'click .close': 'removeBtn'
  },

  render: function () {
    this.$el.html(this.template());
    this.onRender();

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
      this._map.setZoom(15);
      this.subview = new AcornTrail.Views.TrailForm2({
        map: this._map,
        model: new AcornTrail.Models.Trail(),
        collection: this.collection,
        topView: this
      });
      $('.switcheroo').css({
        opacity          : 0,
        WebkitTransition : 'opacity 0.5s ease-in-out',
        MozTransition    : 'opacity 0.5s ease-in-out',
        MsTransition     : 'opacity 0.5s ease-in-out',
        OTransition      : 'opacity 0.5s ease-in-out',
        transition       : 'opacity 0.5s ease-in-out'
      });
      setTimeout(function () {
        google.maps.event.clearInstanceListeners(this.autocomplete);
        $('.switcheroo').html(this.subview.$el);
        this.subview.render();
        $('.switcheroo').css({
          opacity          : 1,
          WebkitTransition : 'opacity 0.5s ease-in-out',
          MozTransition    : 'opacity 0.5s ease-in-out',
          MsTransition     : 'opacity 0.5s ease-in-out',
          OTransition      : 'opacity 0.5s ease-in-out',
          transition       : 'opacity 0.5s ease-in-out'
        });
      }.bind(this), 500)
    } else {
      document.getElementById('autocomplete').value = '';
      document.getElementById('autocomplete').placeholder = 'Enter a place in bay area';
    }
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.remove("");
    }
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.remove("explore");
  },

  remove: function (url) {
    google.maps.event.clearInstanceListeners(this.autocomplete);
    this.subview && this.subview.remove();
    Backbone.View.prototype.remove.call(this);
    if (url === "explore") {
      Backbone.history.navigate(url, { trigger: true })
    }
  },

  onRender: function () {
    $('.text-field').focus();
  }
});
