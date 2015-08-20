AcornTrail.Views.TrailForm2 = Backbone.CompositeView.extend({
  template: JST['trail_form_2'],

  events: {
    "click .reset": "resetMap",
    "click .create-trail": "createTrail"
  },

  initialize: function (options) {
    this._map = options.map;
    var navigation = new AcornTrail.Views.BackToExplore({
      parentView: this
    })
    $('.navigation').html(navigation.render().$el);
  },

  render: function () {
    this.trailPath = [];
    this.markersAndLines = [];
    this.attachMapListeners();

    this.$el.html(this.template({
      trail: this.model
    }));

    return this;
  },

  attachMapListeners: function () {
    this.mapListener = this.mapListener || google.maps.event.addListener(this._map, 'click', function(event) {
      this.addMarker(event.latLng);
    }.bind(this));
  },

  createTrail: function (e) {
    e.preventDefault();
    if (this.trailPath.length < 2) {
      var $div = $('<div>');
      $div.addClass('alert alert-danger alert-dismissible');

      $div.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Please draw at least two points on your trail');
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
        $div.addClass('alert alert-danger alert-dismissible');
        $div.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.responseJSON)
        this.$('.errors').html($div);
      }.bind(this)
    })
  },

  addRoute: function () {
    var view = this;
    var route = this.trailPath;
    for (var i = 0; i < route.length; i++) {
      var newCoord = new AcornTrail.Models.TrailCoordinate({
        trail_id: this.model.get('id'),
        latitude: route[i].G,
        longitude: route[i].K,
        order: i
      }, { trail: view.model });
      newCoord.save({}, {
        success: function (data) {
          view.model.trailCoordinates().add(newCoord);
          if (data.get('order') === route.length - 1) {
            view.model.fetch();
          }
        }
      })
    };
    var view = new AcornTrail.Views.TrailForm3({
      map: this._map,
      model: this.model,
      collection: this.model.trailCoordinates()
    });
    this.remove();
    $('.views').html(view.$el);
    view.render();
  },

  resetMap: function (e){
    e.preventDefault();
    this.removeMarkers();
  },

  addMarker: function (location) {
    this.trailPath.push(location);
    var marker = new google.maps.Marker({
      position: location,
      map: this._map,
      icon: "http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png",
      suppressInfoWindows: true
    });
    this.markersAndLines.push(marker)
    this.addLines();
  },

  addLines: function () {
    var trailPathLine = new google.maps.Polyline({
      path: this.trailPath,
      geodesic: true,
      strokeColor: '#664116',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this.markersAndLines.push(trailPathLine);
    trailPathLine.setMap(this._map);
  },

  removeMarkers: function () {
    this.trailPath = [];
    this.markersAndLines.forEach(function (marker) {
      marker.setMap(null);
      google.maps.event.clearInstanceListeners(marker)
    });
    this.markersAndLines = [];
  },

  remove: function () {
    google.maps.event.removeListener(this.mapListener);
    this.removeMarkers();
    Backbone.View.prototype.remove.call(this);
  }
});
