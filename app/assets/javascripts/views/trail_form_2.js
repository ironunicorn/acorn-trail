AcornTrail.Views.TrailForm2 = Backbone.CompositeView.extend({
  template: JST['trail_form_2'],

  events: {
    "click .create-trail": "createTrail"
  },

  initialize: function (options) {
    this._map = options.map;
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
    this.model.save(formData, {
      success: function () {
        view.collection.add(view.model);
        var nextView = new AcornTrail.Views.TrailForm2b({
          map: view._map,
          model: view.model
        });
        $('.views').css({
          opacity          : 0,
          WebkitTransition : 'opacity 0.5s ease-in-out',
          MozTransition    : 'opacity 0.5s ease-in-out',
          MsTransition     : 'opacity 0.5s ease-in-out',
          OTransition      : 'opacity 0.5s ease-in-out',
          transition       : 'opacity 0.5s ease-in-out'
        });
        setTimeout(function () {
          view.remove();
          $('.views').html(nextView.$el);
          nextView.render();
          $('.views').css({
            opacity          : 1,
            WebkitTransition : 'opacity 0.5s ease-in-out',
            MozTransition    : 'opacity 0.5s ease-in-out',
            MsTransition     : 'opacity 0.5s ease-in-out',
            OTransition      : 'opacity 0.5s ease-in-out',
            transition       : 'opacity 0.5s ease-in-out'
          });
        }, 500)
      },
      error: function (model, response) {
        var $div = $('<div>');
        $div.addClass('alert alert-danger alert-dismissible');
        $div.html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response.responseJSON)
        this.$('.errors').html($div);
      }.bind(this)
    })
  }
});
