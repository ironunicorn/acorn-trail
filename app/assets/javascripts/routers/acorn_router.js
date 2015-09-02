AcornTrail.Routers.AcornRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new AcornTrail.Collections.Trails();
    this.currentUser = new AcornTrail.Models.User({ id: currentUserID });
    this.feed = new AcornTrail.Collections.TrailFeed();
  },

  routes: {
    '': 'About',
    'trails/new': 'trailNew',
    'trails/:id': 'trailShow',
    'edit_profile': 'editProfile',
    'explore': 'trailSearch',
    'about': 'About',
    'squirrels/:id': 'squirrelShow'
  },

  baseView: function () {
    if (!this._baseView) {
      this._baseView = new AcornTrail.Views.BaseView();
      this.$rootEl.html(this._baseView.$el);
      this._baseView.render();
    }
    return this._baseView;
  },

  About: function () {
    this.baseView()._map._map.setOptions({
      zoomControl: false,
      draggableCursor:'crosshair'
    });
    var view = new AcornTrail.Views.About();
    this._swapView(view);
  },

  trailNew: function () {
    this.baseView()._map._map.setOptions({
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      draggableCursor:'crosshair'
    });
    if (currentUserID === -1) {
      this.savedLocation = "trail/new"
      location.href = 'signin'
    } else {
      this.savedLocation = null;
      var view = new AcornTrail.Views.TrailForm1({
        map: this.baseView()._map._map,
        collection: this.collection
      });
      this._swapView(view);
    }
  },

  trailShow: function (id) {
    this.baseView()._map._map.setOptions({
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      zoom: 16,
      draggableCursor:''
    });
    var trail = this.collection.getOrFetch(id);
    var view = new AcornTrail.Views.TrailShow({
      model: trail,
      map: this.baseView()._map._map
    });
    this._swapView(view);
  },

  editProfile: function () {
    this.currentUser.fetch();
    var view = new AcornTrail.Views.EditProfile({
      model: this.currentUser
    });
    this._swapView(view);
  },

  trailSearch: function () {
    this.baseView()._map._map.setOptions({
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      zoom: 13,
      draggableCursor: ''
    });
    var trails = new AcornTrail.Collections.TrailSearch();
    trails.fetch();
    var view = new AcornTrail.Views.SearchMap({
      collection: trails,
      map: this.baseView()._map
    });

    this._swapView(view);
  },

  squirrelShow: function (id) {
    var location = { lat: 37.7833, lng: -122.4167 }
    this.baseView()._map._map.setOptions({
      center: location,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
      },
      zoom: 10,
      draggableCursor:''
    });
    var squirrel = new AcornTrail.Models.Author({id: id});
    squirrel.fetch();
    var view = new AcornTrail.Views.SquirrelShow({
      model: squirrel,
      map: this.baseView()._map._map
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    google.maps.event.clearListeners(this.baseView()._map._map, 'click');
    if (this._currentView) {
      $('.views').css({
        opacity          : 0,
        WebkitTransition : 'opacity 0.5s ease-in-out',
        MozTransition    : 'opacity 0.5s ease-in-out',
        MsTransition     : 'opacity 0.5s ease-in-out',
        OTransition      : 'opacity 0.5s ease-in-out',
        transition       : 'opacity 0.5s ease-in-out'
      });
      setTimeout(function () {
        this._currentView.remove();
        this._currentView = view;
        this.baseView().$('.views').html(view.$el);
        view.render();
        $('.views').css({
          opacity          : 1,
          WebkitTransition : 'opacity 0.5s ease-in-out',
          MozTransition    : 'opacity 0.5s ease-in-out',
          MsTransition     : 'opacity 0.5s ease-in-out',
          OTransition      : 'opacity 0.5s ease-in-out',
          transition       : 'opacity 0.5s ease-in-out'
        });
        var allowedBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(37.303245, -122.807137),
          new google.maps.LatLng(38.006680, -121.852699)
        );
        var lastValidCenter = this.baseView()._map._map.getCenter();

        google.maps.event.addListener(this.baseView()._map._map, 'center_changed', function() {
          if (allowedBounds.contains(this.baseView()._map._map.getCenter())) {
            lastValidCenter = this.baseView()._map._map.getCenter();
            return;
          }

          this.baseView()._map._map.panTo(lastValidCenter);
        }.bind(this));
      }.bind(this), 500)
    } else {
      this._currentView = view;
      this.baseView().$('.views').html(view.$el);
      view.render();
      var allowedBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(37.303245, -122.807137),
        new google.maps.LatLng(38.006680, -121.852699)
      );
      var lastValidCenter = this.baseView()._map._map.getCenter();

      google.maps.event.addListener(this.baseView()._map._map, 'center_changed', function() {
        if (allowedBounds.contains(this.baseView()._map._map.getCenter())) {
          lastValidCenter = this.baseView()._map._map.getCenter();
          return;
        }

        this.baseView()._map._map.panTo(lastValidCenter);
      }.bind(this));
    }
  }
});
