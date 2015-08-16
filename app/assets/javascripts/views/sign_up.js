AcornTrail.Views.SignUp = Backbone.CompositeView.extend({
  template: JST['sign_up'],
  initialize: function (options) {
    this.savedLocation = options.savedLocation;
  },
  events: {
    'submit form': 'login'
  },
  render: function () {
    this.$el.html(this.template());
    return this;
  },

  login: function (e) {
    e.preventDefault();
    var formData = this.$(e.currentTarget).serializeJSON().user;
    this.model.save(formData, {
      success: function () {
        Backbone.history.navigate(this.savedLocation, { trigger: true })
      }.bind(this)
    })
  }

});
