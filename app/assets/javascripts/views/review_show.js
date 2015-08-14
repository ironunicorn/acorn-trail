AcornTrail.Views.ReviewShow = Backbone.CompositeView.extend({
  template: JST['review_show'],
  render: function () {
    this.$el.html(this.template({ review: this.model }));
    return this;
  }
});
