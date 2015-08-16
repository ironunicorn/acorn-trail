AcornTrail.Views.AcornStashesNew = Backbone.CompositeView.extend({
  template: JST['acorn_stashes_new'],

  initialize: function () {
    this.acornStashes = [];
  },

  events: {
    'click .stash-form-bottom a': 'addAcornStashForm',
    'click .stash-form-bottom button': 'createAcornStashes'
  },

  render: function () {
    if (currentUserID !== this.model.get('user_id')) {
      Backbone.history.navigate('trails/' + this.model.get('id'), { trigger: true })
    }
    var content = this.template();
    this.$el.html(content);
    this.addTrailPreview();
    this.addAcornStashForm();
    this.attachSubviews();
    return this;
  },

  addAcornStashForm: function () {
    var subview = new AcornTrail.Views.AcornStashForm({
      model: this.model,
      collection: this.collection
    });
    this.addSubview('.acorn-stash-forms', subview);

    this.acornStashes.push(subview);
  },

  removeAcornStashForm: function (stashForm) {
    this.removeModelSubview('.acorn-stash-forms', stashForm);
  },

  addTrailPreview: function () {
    var subview = new AcornTrail.Views.TrailPreview({
      model: this.model
    });
    this.addSubview('.show-trail', subview);
  },

  removeTrailPreview: function (trailPreview) {
    this.removeModelSubview('.show-trail', trailPreview);
  },

  createAcornStashes: function () {
    this.acornStashes.forEach( function (acornStash) {
      acornStash.createStash();
    });
    Backbone.history.navigate(
      '/trails/' + this.model.get('id'),
      { trigger: true }
    );
  }
});
