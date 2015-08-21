AcornTrail.Views.ReviewShow = Backbone.CompositeView.extend({
  template: JST['review_show'],
  initialize: function (options) {
    this.author = options.author;
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.author, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({
      review: this.model,
      author: this.author
    }));
    this.trailRating();
    return this;
  },

  trailRating: function () {
    this.rating = this.model.get('rating')
    for (var i = 1; i <= 5; i++) {
      if (i <= this.rating) {
        var acorn = '<img class="acorn" data-number="' + i + '" src="http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png"/>'
      } else {
        var acorn = '<img class="acorn" data-number="' + i + '" src="http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439596065/betteracorn_bandw_h51fhs.png"/>'
      }
      this.$(".rating").append(acorn);
    }
  }
});
