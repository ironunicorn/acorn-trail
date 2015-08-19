AcornTrail.Views.Navigation = Backbone.CompositeView.extend({
  template: JST['navigation'],
  events: {
    'mouseover .hamburger': 'displayNav',
    'mouseleave .bar': 'displayHamburger'
  },
  render: function () {
    this.$el.html(this.template());
    return this;
  },
  displayNav: function () {
    this.$(".hamburger").addClass('hidden');
    this.$(".bar").removeClass('hidden');
  },
  displayHamburger: function () {
    this.$(".bar").addClass('hidden');
    this.$(".hamburger").removeClass('hidden');
  }
});
