AcornTrail.Views.ReviewShow = Backbone.CompositeView.extend({
  template: JST['review_show'],
  initialize: function (options) {
    this.author = options.author;
    this.listenTo(this.author, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({
      review: this.model,
      author: this.author
    }));
    return this;
  }
});
