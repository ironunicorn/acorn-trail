AcornTrail.Views.AcornStashForm = Backbone.CompositeView.extend({
  template: JST['acorn_stash_form'],
  tagName: 'form',

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.newStash = new AcornTrail.Models.AcornStash();
  },

  render: function () {
    this._map = new AcornTrail.Views.AcornMap();

    this.$el.html(this.template({
      // acornStash: this.newStash
    }));

    this.$('.acorn-map').html(this._map.$el)
    this._map.render({ collection: this.model.trailCoordinates() });

    return this;
  },

  remove: function () {
    this._map.remove();
    Backbone.View.prototype.remove.call(this);
  },

  createStash: function () {
    this.newStash.set({ trail_coordinate_id: this._map.trail_coordinate_id });
    var formData = this.$el.serializeJSON().acorn_stash;
    this.newStash.set(formData);
    this.newStash.save({}, {
      error: function (model, response) {
        return response;
      }
    });
  }


})
