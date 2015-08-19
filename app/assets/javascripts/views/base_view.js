AcornTrail.Views.BaseView = Backbone.CompositeView.extend({
  template: JST['base_view'],
  className: 'parent',
  initialize: function () {
    this.addNavigationView();
  },
  render: function () {
    this.$el.html(this.template());
    this._map = new AcornTrail.Views.Map();
    this.$('.google-maps').html(this._map.$el)
    this._map.render();
    this.attachSubviews();
  },

  addNavigationView: function () {
    var subview = new AcornTrail.Views.Navigation();
    this.addSubview('.navigation', subview);
  }
});
