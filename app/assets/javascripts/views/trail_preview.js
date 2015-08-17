AcornTrail.Views.TrailPreview = Backbone.CompositeView.extend({
  template: JST['trail_preview'],
  className: 'container-fluid',

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.trailCoordinates(), "sync", this.acornStashes);
  },

  render: function () {
    this._map = new AcornTrail.Views.TrailMap();

    this.$el.html(this.template({
      trail: this.model
    }));

    this.$('.google-maps-show').html(this._map.$el)
    this._map.render({
      collection: this.model.trailCoordinates()
     });

    return this;
  },



});
