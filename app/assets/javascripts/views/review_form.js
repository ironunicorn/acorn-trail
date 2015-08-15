AcornTrail.Views.ReviewForm = Backbone.CompositeView.extend({
  template: JST['review_form'],
  tagName: 'form',
  events: {
    'submit': 'submitReview',
    'click .acorn': 'rateTrail'
  },
  render: function () {
    this.$el.html(this.template({
      review: this.model
    }))
  },
  submitReview: function (e) {
    e.preventDefault();
    var view = this;
    var trail_id = this.model.get('trail_id');
    this.model.set({ rating: this.rating });
    var formData = this.$el.serializeJSON().review
    this.model.save(formData, {
      success: function () {
        view.collection.add(view.model);
        view.model = new AcornTrail.Models.Review({
          trail_id: trail_id
        });
        view.render();
      },
      // error: function () {
      //   thing to write
      // }
    });
  },
  rateTrail: function (e) {
    this.rating = $(e.currentTarget).data('number');
    this.$(".rating").html('')
    for (var i = 1; i <= 5; i++) {
      if (i <= this.rating - 1) {
        var acorn = '<img class="acorn" data-number="' + i + '" src="http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439596065/betteracorn_bandw_h51fhs.png"/>'
      } else {
        var acorn = '<img class="acorn" data-number="' + i + '" src="http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png"/>'
      }
      this.$(".rating").prepend(acorn)
    }
  }


});
