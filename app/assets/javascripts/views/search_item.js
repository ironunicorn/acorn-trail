AcornTrail.Views.SearchItem = Backbone.CompositeView.extend({
  template: JST['search_item'],
  className: 'search-item',
  initialize: function (options) {
    if (options.marker) {
      this.marker = options.marker;
    }
  },
  events: {
    "click": "trailShow",
    "mouseenter": "markerBounce",
    "mouseleave": "markerStop"
  },
  render: function () {
    this.$el.html(this.template({ trail: this.model }));
    return this;
  },
  trailShow: function () {
    Backbone.history.navigate(
      '/trails/' + this.model.get('id'),
      { trigger: true }
    );
  },
  markerBounce: function () {
    if (this.marker) {
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  },
  markerStop: function () {
    if (this.marker) {
      this.marker.setAnimation(null);
    }
  }


});
