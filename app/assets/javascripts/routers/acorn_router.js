AcornTrail.Routers.AcornRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new AcornTrail.Collections.Trails();
  },

  routes: {
    '': 'trailFeed',
    'trails/new': 'trailNew',
    'trails/:id/edit': 'trailEdit',
    'trails/:id/share_acorn_stashes': 'AcornStashesNew',
    'trails/:id': 'trailShow',
    'edit_profile': 'editProfile',
    'explore': 'trailSearch'
  },

  trailFeed: function () {
    this.collection.fetch();
    var view = new AcornTrail.Views.TrailFeed({
      collection: this.collection
    });
    this._swapView(view);
  },

  trailNew: function () {
    var trail = new AcornTrail.Models.Trail();
    var view = new AcornTrail.Views.TrailForm({
      collection: this.collection,
      model: trail
    });
    this._swapView(view);
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
    var user = new AcornTrail.Models.User({ id: 1 });
    user.fetch({
      success: function () {
        var view = new AcornTrail.Views.EditProfile({
          model: user.currentUser()
        });
        this._swapView(view);
      }.bind(this)
    });
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
