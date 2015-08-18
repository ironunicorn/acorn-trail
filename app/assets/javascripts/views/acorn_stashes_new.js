AcornTrail.Views.AcornStashesNew = Backbone.CompositeView.extend({
  template: JST['acorn_stashes_new'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.trailCoordinates(), "sync", this.acornStashes);
  },

  render: function () {
    if (currentUserID !== this.model.get('user_id')) {
      Backbone.history.navigate('trails/' + this.model.get('id'), { trigger: true })
    }
    this._map = new AcornTrail.Views.AcornMap();

    this.$el.html(this.template({
      trail: this.model
    }));

    this.$('.google-maps-acorn').html(this._map.$el)
    this._map.render({
      collection: this.model.trailCoordinates()
     });

    return this;
  },

  events: {
    'click .stash-form-bottom button': 'createAcornStashes'
  },

// transact??
  createAcornStashes: function () {
    var acornStashes = this._map.markers
    for (var i = 0; i < acornStashes.length; i++) {
      var data = acornStashes[i].view.$el.serializeJSON().acorn_stash;
      if (!data.title && !acornStashes[i].void) {
        var $div = $('<div>');
        $div.addClass('alert alert-danger');
        $div.html("All acorn stashes must have a title.");
        this.$('.errors').html($div);
        return;
      }
    }
    acornStashes.forEach( function (acornStash) {
      if (!acornStash.void) {
        acornStash.view.createStash();
      }
    });
    Backbone.history.navigate(
      '/trails/' + this.model.get('id'),
      { trigger: true }
    );
  }
});
