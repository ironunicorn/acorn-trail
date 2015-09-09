AcornTrail.Views.TrailForm2 = Backbone.CompositeView.extend({
  template: JST['trail_form_2'],

  events: {
    "click .create-trail": "createTrail"
  },

  initialize: function (options) {
    this._map = options.map;
    this.topView = options.topView;
    $('.navigation').html('');
  },

  render: function () {
    this.$el.html(this.template({
      trail: this.model
    }));

    return this;
  },

  createTrail: function (e) {
    e.preventDefault();
    var view = this;
    var formData = $('form').serializeJSON().trail;
    this.model.set(formData);
    if (this.model.escape('title')) {
      var nextView = new AcornTrail.Views.TrailForm2b({
        map: view._map,
        model: view.model,
        topView: view.topView
      });
      $('.switcheroo').css({
        opacity          : 0,
        WebkitTransition : 'opacity 0.5s ease-in-out',
        MozTransition    : 'opacity 0.5s ease-in-out',
        MsTransition     : 'opacity 0.5s ease-in-out',
        OTransition      : 'opacity 0.5s ease-in-out',
        transition       : 'opacity 0.5s ease-in-out'
      });
      setTimeout(function () {
        view.remove();
        view.topView.subview = nextView;
        $('.switcheroo').html(nextView.$el);
        nextView.render();
        $('.switcheroo').css({
          opacity          : 1,
          WebkitTransition : 'opacity 0.5s ease-in-out',
          MozTransition    : 'opacity 0.5s ease-in-out',
          MsTransition     : 'opacity 0.5s ease-in-out',
          OTransition      : 'opacity 0.5s ease-in-out',
          transition       : 'opacity 0.5s ease-in-out'
        });
      }, 500)
    } else {
      var $div = $('<div>');
      $div.addClass('alert alert-danger alert-dismissible');
      $div.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Please give your trail a title')
      this.$('.errors').html($div);
    }
  }
});
