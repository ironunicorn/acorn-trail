AcornTrail.Views.TrailForm3 = Backbone.CompositeView.extend({
  template: JST['trail_form_3'],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this._map = options.map;
  },

  render: function () {
    this.$el.html(this.template({
      trail: this.model
    }));
    return this;
  },

  events: {
    'click .stash-form-bottom button': 'createAcornStashes'
  },

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
