AcornTrail.Views.BackToExplore = Backbone.CompositeView.extend({
  template: JST['back_to_explore'],
  initialize: function (options) {
    this.parentView = options.parentView;
  },
  events: {
    'click': 'returnToExplore'
  },
  render: function () {
    this.$el.html(this.template());
    return this;
  },
  returnToExplore: function () {
    this.parentView.remove();
    Backbone.history.navigate('', { trigger: true })
  }
})
