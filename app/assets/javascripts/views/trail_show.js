AcornTrail.Views.TrailShow = Backbone.CompositeView.extend({
  template: JST['trail_show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this._map = new AcornTrail.Views.TrailMap();

    this.$el.html(this.template({
      trail: this.model
    }));

    this.$('.google-maps-show').html(this._map.$el)
    this._map.render({ collection: this.model.trailCoordinates() });

    return this;
  },

  remove: function () {
    this._map.remove();
    Backbone.View.prototype.remove.call(this);
  }
});
