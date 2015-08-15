AcornTrail.Views.TrailShow = Backbone.CompositeView.extend({
  template: JST['trail_show'],
  className: 'container-fluid',

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.trailCoordinates(), "sync", this.acornStashes);
    this.listenTo(this.model.author(), "sync", this.author);
    this.listenTo(this.model.reviews(), "add", this.addReview);
    this.listenTo(this.model.reviews(), "remove", this.removeReview);
    this.model.reviews().each(this.addReview.bind(this));
    if (options.currentUser) { this.currentUser = options.currentUser };
  },

  render: function () {
    this._map = new AcornTrail.Views.TrailMap();

    this.$el.html(this.template({
      trail: this.model
    }));

    this.$('.google-maps-show').html(this._map.$el)
    this._map.render({
      collection: this.model.trailCoordinates()
     });
    this.acornStashes();
    this.author();
    if (this.model.author().get('id') !== currentUserID ) {
      this.reviewForm();
    }
    this.attachSubviews();

    return this;
  },

  acornStashes: function () {
    var parent = this;
    var acornOrder = 1;
    this.model.trailCoordinates().each(function (coord) {
      if (coord.acornStash().length) {
        var acorn = coord.acornStash().at(0);
        acorn.order = acornOrder++;
        var view = new AcornTrail.Views.AcornStashItem({
          model: acorn
        })
        parent.acornStash = true;
        parent.addSubview(".acorn-stashes", view);
      }
    })
  },

  author: function () {
    this.$(".author").html('')
    var view = new AcornTrail.Views.AuthorShow({ model: this.model.author() });
    this.addSubview(".author", view);
    view.render();
  },

  addReview: function (review) {
    var view = new AcornTrail.Views.ReviewShow({
      model: review,
      author: review.reviewAuthor()
    });
    this.addSubview(".reviews", view);
  },

  removeReview: function (review) {
    this.removeModelSubview(".reviews", review)
  },

  reviewForm: function () {
    var review = new AcornTrail.Models.Review();
    review.set({ trail_id: this.model.get('id') })
    var view = new AcornTrail.Views.ReviewForm({
      model: review,
      collection: this.model.reviews()
    });
    this.$(".review-form").html(view.$el);
    view.render();
  }

});
