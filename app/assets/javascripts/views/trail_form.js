AcornTrail.Views.TrailForm = Backbone.CompositeView.extend({
  template: JST['trail_form'],

  className: 'form',

  events: {
    "click button.reset": "resetMap",
    "click .create-trail": "createTrail"
  },

  createTrail: function (e) {
    e.preventDefault();
    if (this._map.trailPath.length < 2) {
      var $div = $('<div>');
      $div.addClass('alert alert-danger');
      $div.html("Please draw at least two points on your trail");
      this.$('.errors').html($div);
      return;
    }
    var view = this;
    var formData = $('form').serializeJSON().trail;
    this.model.save(formData, {
      success: function () {
        view.collection.add(view.model);
        view.addRoute();
      },
      error: function (model, response) {
        var $div = $('<div>');
        $div.addClass('alert alert-danger');
        $div.html(response.responseJSON)
        this.$('.errors').html($div);
      }.bind(this)
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
  // Shouldn't work, but it does??
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

  resetMap: function (){
    this._map.removeMarkers();
  },

  remove: function () {
    this._map.remove();
    Backbone.View.prototype.remove.call(this);
  }
});
