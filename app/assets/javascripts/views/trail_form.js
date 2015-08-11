AcornTrail.Views.TrailForm = Backbone.CompositeView.extend({
  template: JST['trail_form'],
  tagName: 'form',

  render: function () {
    // var coords = new AcornTrail.Collections.TrailCoordinates({
    //   trail: this.model
    // });
    this._map = new AcornTrail.Views.MapDraw();

    this.$el.html(this.template({
      trail: this.model
    }));

    this.$('.google-maps-draw').html(this._map.$el)
    this._map.render();

    return this;
  },

  remove: function () {
    this._map.remove();
    Backbone.View.prototype.remove.call(this);
  }
});
