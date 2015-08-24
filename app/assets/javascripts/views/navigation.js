AcornTrail.Views.Navigation = Backbone.CompositeView.extend({
  template: JST['navigation'],
  events: {
    'click .logout': 'logout'
  },
  render: function () {
    this.$el.html(this.template());
    return this;
  },
  logout: function () {
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function () {
        location.reload();
      }
    });
  }
});
