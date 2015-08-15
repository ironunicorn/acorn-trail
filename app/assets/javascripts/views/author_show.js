AcornTrail.Views.AuthorShow = Backbone.CompositeView.extend({
  template: JST['author_show'],
  className: '.clear-fix',
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },
  render: function () {
    this.$el.html(this.template({ author: this.model }));
    return this;
  }
});
