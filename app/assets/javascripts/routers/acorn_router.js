AcornTrail.Routers.AcornRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new AcornTrail.Collections.Trails();
    this.currentUser = new AcornTrail.Models.User({ id: currentUserID });
    this.feed = new AcornTrail.Collections.TrailFeed();
  },

  routes: {
    '': 'trailSearch',
    'trails/new': 'trailNew',
    'trails/:id/edit': 'trailEdit',
    'trails/:id/share_acorn_stashes': 'AcornStashesNew',
    'trails/:id': 'trailShow',
    'edit_profile': 'editProfile',
    'explore': 'trailSearch'
  },

  baseView: function () {
    if (!this._baseView) {
      this._baseView = new AcornTrail.Views.BaseView();
      this.$rootEl.html(this._baseView.$el);
      this._baseView.render();
    }
    return this._baseView;
  },


  trailFeed: function () {
    this.feed.fetch();
    var view = new AcornTrail.Views.TrailFeed({
      collection: this.feed
    });
    this._swapView(view);
  },

  trailNew: function () {
    if (currentUserID === -1) {
      this.savedLocation = "trail/new"
      location.href = 'session/new'
    } else {
      this.savedLocation = null;
      var view = new AcornTrail.Views.TrailForm1({
        map: this.baseView()._map._map,
        collection: this.collection
      });
      this._swapView(view);
    }
  },

  trailEdit: function (id) {
    var trail = this.collection.getOrFetch(id);
    var view = new AcornTrail.Views.TrailForm({
      collection: this.collection,
      model: trail
    });
    this._swapView(view);
  },

  trailShow: function (id) {
    var trail = this.collection.getOrFetch(id);
    var view = new AcornTrail.Views.TrailShow({
      model: trail
    });
    this._swapView(view);
  },

  AcornStashesNew: function (id) {
    var trail = this.collection.getOrFetch(id);
    var view = new AcornTrail.Views.AcornStashesNew({
      model: trail
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
    if (this.savedLocation) {
      Backbone.history.navigate(this.savedLocation, { trigger: true });
    }
    var trails = new AcornTrail.Collections.TrailSearch();
    trails.fetch();
    var view = new AcornTrail.Views.SearchMap({
      collection: trails,
      map: this.baseView()._map
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.baseView().$('.views').html(view.$el);
    view.render();
  }
});
