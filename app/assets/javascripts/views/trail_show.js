AcornTrail.Views.TrailShow = Backbone.CompositeView.extend({
  template: JST['trail_show'],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.trailCoordinates(), "sync", this.acornStashes);
    this.listenTo(this.model.author(), "sync", this.author);
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
    this.attachSubviews();
    this.acornStashes();
    this.author();
    return this;
  },

  acornStashes: function () {
    var parent = this;
    this.model.trailCoordinates().each(function (coord) {
      if (coord.acornStash().length) {
        var acorn = coord.acornStash().at(0);
        acorn.order = coord.get('order')
        var view = new AcornTrail.Views.AcornStashItem({
          model: acorn
        })
        parent.acornStash = true;
        parent.addSubview(".acorn-stashes", view);
      }
    })
  },

  author: function () {
    var view = new AcornTrail.Views.AuthorShow({ model: this.model.author() });
    this.addSubview(".author", view);
  }

});
