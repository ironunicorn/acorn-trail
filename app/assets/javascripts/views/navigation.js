AcornTrail.Views.Navigation = Backbone.CompositeView.extend({
  template: JST['navigation'],
  events: {
    'mouseover .not': 'displayNav',
    'mouseleave .wat': 'displayHamburger'
  },
  render: function () {
    this.$el.html(this.template());
    return this;
  },
  displayNav: function () {
    var $nav = $('<div>create trail edit profile stuff</div>');
    $nav.addClass('wat');
    this.$el.html($nav);
  },
  displayHamburger: function () {
    var $nav = $('<div>&#9776</div>');
    $nav.addClass('not');
    this.$el.html($nav);
  }
});
