AcornTrail.Views.TrailFeed = Backbone.CompositeView.extend({
  template: JST['trail_feed'],
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },
  render: function () {
    this.$el.html(this.template({ trails: this.collection }));
  }
});
