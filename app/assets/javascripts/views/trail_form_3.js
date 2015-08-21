AcornTrail.Views.TrailForm3 = Backbone.CompositeView.extend({
  template: JST['trail_form_3'],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.addlines);
    this.markers = [];
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
    this.trailPathLine.setMap(null);
    google.maps.event.clearInstanceListeners(this.trailPathLine);
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
      var acornStash = new AcornTrail.Models.AcornStash();
      var content = new AcornTrail.Views.AcornStashForm({
        model: acornStash,
        trail_coordinate_id: options.trail_coordinate_id,
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
    this.trailPathLine = new google.maps.Polyline({
      path: this.route(),
      geodesic: true,
      strokeColor: '#664116',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this.trailPathLine.setMap(this._map);
    google.maps.event.addListener(this.trailPathLine, 'click', function(event) {
      this.addMarker(event.latLng);
    }.bind(this));
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
    for (var i = 0; i < this.markers.length; i++) {
      var data = this.markers[i].view.$('form').serializeJSON().acorn_stash;
      if (!data.title && !this.markers[i].void) {
        var $div = $('<div>');
        $div.addClass('alert alert-danger');
        $div.html("All acorn stashes must have a title.");
        this.$('.errors').html($div);
        return;
      }
    }
    this.markers.forEach( function (acornStash) {
      if (!acornStash.void) {
        acornStash.view.createStash();
      }
    });
    this.remove();
    $('.confirmation').html('<div class="alert alert-success">' + this.model.escape('title') + ' created!</div>');
    setTimeout(function () { $('.confirmation').html('')}, 1000)
    Backbone.history.navigate(
      '/trails/' + this.model.get('id'),
      { trigger: true }
    );
  }
});
