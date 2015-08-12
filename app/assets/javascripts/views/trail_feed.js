AcornTrail.Views.TrailFeed = Backbone.CompositeView.extend({
  template: JST['trail_feed'],

  initialize: function () {
    this.listenTo(this.collection, "add", this.addTrailListItem);
    this.collection.each(this.addTrailListItem.bind(this));
    this.listenTo(this.collection, "remove", this.removeTrailListItem);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  addTrailListItem: function (trailItem) {
    var subview = new AcornTrail.Views.TrailListItem({
      model: trailItem
    });
    this.addSubview('.trail-list', subview);
  },

  removeTrailListItem: function (trailItem) {
    this.removeModelSubview('.trail-list', trailItem);
  }
});
