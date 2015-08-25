AcornTrail.Views.About = Backbone.View.extend({
  template: JST['about'],
  className: 'about',
  events: {
    "click .front": "explore"
  },
  render: function () {
    this.$el.html(this.template());
    var navigation = new AcornTrail.Views.Navigation();
    $('.navigation').html(navigation.render().$el);
    return this;
  },
  explore: function () {
    Backbone.history.navigate('/explore', { trigger: true });
  }
});
