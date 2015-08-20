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
      this._map.setZoom(14);
      this.remove();
      var view = new AcornTrail.Views.TrailForm2({
        map: this._map,
        model: new AcornTrail.Models.Trail(),
        collection: this.collection
      });
      $('.views').html(view.$el);
      view.render();
    } else {
      document.getElementById('autocomplete').placeholder = 'Sorry, which city?';
    }
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.remove("");
    }
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.remove("");
  },

  remove: function (url) {
    google.maps.event.clearInstanceListeners(this.autocomplete);
    google.maps.event.clearInstanceListeners(this._map);
    Backbone.View.prototype.remove.call(this);
    if (url === "") {
      Backbone.history.navigate(url, { trigger: true })
    }
  },

  onRender: function () {
    $('.text-field').focus();
  }
});
