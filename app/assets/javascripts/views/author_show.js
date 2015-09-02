AcornTrail.Views.AuthorShow = Backbone.CompositeView.extend({
  template: JST['author_show'],
  events: {
    'click': 'squirrelShow'
  },
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },
  render: function () {
    this.$el.html(this.template({ author: this.model }));
    return this;
  },
  squirrelShow: function () {
    Backbone.history.navigate(
      'squirrels/' + this.model.get('id'),
      { trigger: true }
    )
  }
});
