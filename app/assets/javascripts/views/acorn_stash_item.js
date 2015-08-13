AcornTrail.Views.AcornStashItem = Backbone.CompositeView.extend({
  template: JST['acorn_stash_item'],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({ acorn_stash: this.model }));
    return this;
  }
})
