AcornTrail.Views.TrailForm3 = Backbone.CompositeView.extend({
  template: JST['trail_form_3'],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.addlines);
    this.markers = [];
    this.trailPathLines = [];
    this._map = options.map;
  },

  events: {
    'click button': 'createAcornStashes'
  },

  render: function () {
    this.$el.html(this.template({
      trail: this.model
    }));
    this.addLines();
    this.attachMapListeners();
    
    return this;
  },

  attachMapListeners: function () {
    google.maps.event.addListener(this._map, 'click', function(event) {
      this.addMarker(event.latLng);
    }.bind(this));
  },

  remove: function () {
    google.maps.event.clearInstanceListeners(this._map);
    _(this.trailPathLines).each(function (trailPathLine) {
      trailPathLine.setMap(null);
      google.maps.event.clearInstanceListeners(trailPathLine);
    });
    _(this.markers).each(function (marker) {
      marker.setMap(null);
      marker.view.remove();
      google.maps.event.clearInstanceListeners(marker);
    })
    Backbone.View.prototype.remove.call(this);
  },

  addMarker: function (location) {
    var options = this.locateNearestMarker(location);
    var marker = null;
    for (var i = 0; i < this.markers.length; i++) {
      if (!this.markers[i].void && this.markers[i].position.G === options.coords.G &&
        this.markers[i].position.K === options.coords.K) {
        marker = this.markers[i];
      };
    }
    if (!marker) {
      var acornStash = new AcornTrail.Models.AcornStash({
        trail_coordinate_id: options.trail_coordinate_id
      });
      var content = new AcornTrail.Views.AcornStashForm({
        model: acornStash,
        map: this
      });
      content.render();
      $('.views').append(content.$el);
      var marker = new google.maps.Marker({
        position: options.coords,
        map: this._map,
        icon: "http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png",
        view: content
      });
      content.marker = marker;
      this.markers.push(marker);
      marker.setMap(this._map);
    } else {
      marker.view.$el.removeClass('hidden');
    }
  },

  locateNearestMarker: function (location) {
    var best = '';
    var coords = null;
    var trail_coordinate_id = null;
    this.collection.each( function (model) {
      var latDiff = Math.pow((model.get('latitude') - location.G), 2);
      var lngDiff = Math.pow((model.get('longitude') - location.K), 2);
      if (best === '') {
        best = Math.sqrt(latDiff + lngDiff);
        coords = new google.maps.LatLng(
          model.get('latitude'),
          model.get('longitude')
        );
        trail_coordinate_id = model.get('id');
      } else {
        var potential = Math.sqrt(latDiff + lngDiff);
        if (best > potential) {
          best = potential;
          coords = new google.maps.LatLng(
            model.get('latitude'),
            model.get('longitude')
          );
          trail_coordinate_id = model.get('id');
        }
      }
    }.bind(this));
    return { coords: coords, trail_coordinate_id: trail_coordinate_id };;
  },

  addLines: function () {
    var trailPathLine = new google.maps.Polyline({
      path: this.route(),
      geodesic: true,
      strokeColor: '#664116',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    trailPathLine.setMap(this._map);
    google.maps.event.addListener(trailPathLine, 'click', function(event) {
      this.addMarker(event.latLng);
    }.bind(this));
    this.trailPathLines.push(trailPathLine);
  },

  route: function () {
    this._route = [];
    this.collection.each(function (coord) {
      var location = new google.maps.LatLng(
        coord.get('latitude'),
        coord.get('longitude')
      );
      this._route.push(location);
      if (coord.get('order') === 0) {
        this._map.setCenter(location);
      }
    }.bind(this))

    return this._route;
  },

  createAcornStashes: function () {
    var view = this;
    var acornStashes = [];
    _(this.markers).each( function (marker) {
      if (!marker.void) {
        acornStashes.push(marker.view.model);
      }
    })
    for (var i = 0; i < acornStashes.length; i++) {
      if (i === acornStashes.length - 1) {
        acornStashes[i].save({}, {success: function () {
          var $div = $('<div>');
          $div.addClass('alert alert-success alert-dismissible');
          $div.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + view.model.get('title') + " stored successfully");
          $('.confirmation').html($div);
          view.remove();
          Backbone.history.navigate(
            '/trails/' + view.model.get('id'),
            { trigger: true }
          );
        }});
      } else {
        acornStashes[i].save();
      }
    }
  }
});
