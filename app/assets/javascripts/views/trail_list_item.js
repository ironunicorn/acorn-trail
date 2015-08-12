AcornTrail.Views.TrailListItem = Backbone.CompositeView.extend({
  template: JST['trail_list_item'],
  className: 'trail-list-item',
  events: {
    'click': 'showTrail'
  },
  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },
  render: function () {
    this.$el.html(this.template({
      trail: this.model
    }));

    return this;
  },
  showTrail: function (e) {
    Backbone.history.navigate(
      '/trails/' + this.model.get('id'),
      { trigger: true }
    );
  }
});
