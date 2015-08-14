AcornTrail.Views.TrailForm = Backbone.CompositeView.extend({
  template: JST['trail_form'],

  className: 'form',

  events: {
    "submit form": "createTrail"
  },

  createTrail: function (e) {
    e.preventDefault();
    if (this._map.trailPath.length < 2) {
      this.$('.errors').html("please draw at least two points on your trail");
      return;
    }
    var view = this;
    var formData = $(e.currentTarget).serializeJSON().trail;
    this.model.save(formData, {
      success: function () {
        view.collection.add(view.model);
        view.addRoute();
      },
      // error: function (model, response) {
      //   console.log(response);
      // }
    })
  },

  addRoute: function () {
    var view = this;
    var route = this._map.trailPath;
    for (var i = 0; i < route.length; i++) {
      var newCoord = new AcornTrail.Models.TrailCoordinate({
        trail_id: this.model.get('id'),
        latitude: route[i].G,
        longitude: route[i].K,
        order: i
      }, { trail: view.model });
      newCoord.save({}, {
        success: function () {
          view.model.trailCoordinates().add(newCoord);
          Backbone.history.navigate(
            '/trails/' + view.model.get('id') + '/share_acorn_stashes',
            { trigger: true }
          )
        }
      })
    };
  },

  render: function () {
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
