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

  trailFeed: function () {
    this.feed.fetch();
    var view = new AcornTrail.Views.TrailFeed({
      collection: this.feed
    });
    this._swapView(view);
  },

  trailNew: function () {
    if (currentUserID === -1) {
      location.href = 'session/new'
    } else {
      var trail = new AcornTrail.Models.Trail();
      var view = new AcornTrail.Views.TrailForm({
        collection: this.collection,
        model: trail
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
    var trails = new AcornTrail.Collections.TrailSearch();
    trails.fetch();
    var view = new AcornTrail.Views.TrailSearch({
      collection: trails
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }

});
