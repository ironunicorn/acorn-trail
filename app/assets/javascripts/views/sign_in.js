AcornTrail.Views.SignIn = Backbone.CompositeView.extend({
  template: JST['sign_in'],
  tagName: 'form',
  initialize: function (options) {
    this.savedLocation = options.savedLocation;
  },
  events: {
    'submit': 'login'
  },
  render: function () {
    this.$el.html(this.template());
    return this;
  },

  login: function (e) {
    e.preventDefault();
    var formData = this.$el.serializeJSON().user;
    this.model.save(formData, {
      success: function () {
        Backbone.history.navigate(this.savedLocation, { trigger: true })
      }.bind(this)
    })
  }

});
