AcornTrail.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  currentUser: function () {
    if (!this._currentUser) {
      this._currentUser = new AcornTrail.Models.User();
    }

    return this._currentUser;
  },

  parse: function (response) {
    if (response.current_user) {
      this.currentUser().set(response.current_user);
      delete response.current_user;
    }
    return response;
  }
});
