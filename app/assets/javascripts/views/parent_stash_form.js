AcornTrail.Views.ParentStashForm = Backbone.CompositeView.extend({
  template: JST['parent_stash_form'],

  initialize: function () {
    this.collection.each(this.addTrailListItem.bind(this));
  },

  events: {
    'click .stash-form-bottom button': 'addAcornStashForm'
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.addAcornStashForm();
    this.attachSubviews();
    return this;
  },

  addAcornStashForm: function () {
    var subview = new AcornTrail.Views.AcornStashForm({
      model: new AcornTrail.Models.AcornStash()
    });
    this.addSubview('.acorn-stash-forms', subview);
  },

  removeAcornStashForm: function (stashForm) {
    this.removeModelSubview('.acorn-stash-forms', stashForm);
  },

  addTrailShow: function () {
    var subview = new AcornTrail.Views.TrailShow({
      model: this.model
    });
    this.addSubview('.show-trail', subview);
  },

  removeTrailShow: function (trailShow) {
    this.removeModelSubview('.show-trail', trailShow);
  }
});
