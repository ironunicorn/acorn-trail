AcornTrail.Views.TrailForm2b = Backbone.CompositeView.extend({
  template: JST['trail_form_2b'],

  events: {
    "click .reset": "resetMap",
    "click .create-trail": "addRoute"
  },

  initialize: function (options) {
    this._map = options.map;
    this.topView = options.topView;
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
    this.mapListener = google.maps.event.addListener(this._map, 'click', function(event) {
      this.addMarker(event.latLng);
    }.bind(this));
  },

  resetMap: function (e){
    e.preventDefault();
    this.removeMarkers();
  },

  addMarker: function (location) {
    this.trailPath.push(location);
    if (this.trailPath.length === 1) {
      var marker = new google.maps.Marker({
        position: location,
        map: this._map,
        icon: "http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png"
      });
      marker.setCursor('crosshair');
      this.markersAndLines.push(marker);
    }
    this.addLines();
  },

  addLines: function () {
    var symbolOne = {
      path: 'M -2,0 0,-2 2,0 0,2 z',
      strokeColor: '#292',
      fillColor: '#292',
      fillOpacity: 1
    };

    var trailPathLine = new google.maps.Polyline({
      path: this.trailPath,
      geodesic: true,
      strokeColor: '#664116',
      strokeOpacity: 1.0,
      strokeWeight: 4,
      icons: [{
          icon: symbolOne,
          offset: '0%'
      }]
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
    google.maps.event.clearListeners(this._map, 'click');
    this.removeMarkers();
    $('.confirmation').html('');
    Backbone.View.prototype.remove.call(this);
  },

  addRoute: function (e) {
    e.preventDefault();
    if (this.trailPath.length < 2) {
      var $div = $('<div>');
      $div.addClass('alert alert-danger alert-dismissible');
      $div.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Please draw at least two points on your trail');
      $('.confirmation').html($div);
      return;
    }
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
    $('.switcheroo').css({
      opacity          : 0,
      WebkitTransition : 'opacity 0.5s ease-in-out',
      MozTransition    : 'opacity 0.5s ease-in-out',
      MsTransition     : 'opacity 0.5s ease-in-out',
      OTransition      : 'opacity 0.5s ease-in-out',
      transition       : 'opacity 0.5s ease-in-out'
    });
    setTimeout(function () {
      $('.confirmation').html('');
      this.topView.subview = view;
      this.remove();
      $('.switcheroo').html(view.$el);
      view.render();
      $('.switcheroo').css({
        opacity          : 1,
        WebkitTransition : 'opacity 0.5s ease-in-out',
        MozTransition    : 'opacity 0.5s ease-in-out',
        MsTransition     : 'opacity 0.5s ease-in-out',
        OTransition      : 'opacity 0.5s ease-in-out',
        transition       : 'opacity 0.5s ease-in-out'
      });
    }.bind(this), 500)
  },

});
