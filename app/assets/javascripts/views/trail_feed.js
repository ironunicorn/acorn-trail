AcornTrail.Views.TrailFeed = Backbone.CompositeView.extend({
  template: JST['trail_feed'],
  render: function () {
    this.$el.html(this.template({ trails: this.collection }));
  }
});
