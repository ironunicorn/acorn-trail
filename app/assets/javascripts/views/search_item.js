AcornTrail.Views.SearchItem = Backbone.CompositeView.extend({
  template: JST['search_item'],

  events: {
    "click": "trailShow"
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
  }
});
