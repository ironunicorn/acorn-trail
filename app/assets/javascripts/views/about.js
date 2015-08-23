AcornTrail.Views.About = Backbone.View.extend({
  template: JST['about'],
  className: 'about',
  events: {
    "click .front": "explore"
  },
  render: function () {
    this.$el.html(this.template());
    return this;
  },
  explore: function () {
    Backbone.history.navigate('/explore', { trigger: true });
  }
});
