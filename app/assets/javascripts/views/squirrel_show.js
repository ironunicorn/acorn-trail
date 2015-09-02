AcornTrail.Views.SquirrelShow = Backbone.CompositeView.extend({
  template: JST['squirrel_show'],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this._map = options.map;
    this.listenTo(this.model.trails(), "add", this.addTrail);
    this.listenTo(this.model.trails(), "remove", this.removeTrail);
    this.model.trails().each(this.addTrail.bind(this));
    this.markers = [];
    var navigation = new AcornTrail.Views.BackToExplore({
      parentView: this
    })
    $('.navigation').html(navigation.render().$el);
  },

  events: {
    'click .more': 'showMore',
    'click .less': 'showLess'
  },

  showMore: function () {
    this.$('.title span').removeClass("glyphicon-menu-down");
    this.$('.title span').addClass("glyphicon-menu-up");
    this.$('.title').addClass("less");
    this.$('.title').removeClass("more");
    // this.$('.trail-show').addClass("full");
    this.$('.info').css({
      height           : '100vh',
      WebkitTransition : 'height 0.5s ease-in-out',
      MozTransition    : 'height 0.5s ease-in-out',
      MsTransition     : 'height 0.5s ease-in-out',
      OTransition      : 'height 0.5s ease-in-out',
      transition       : 'height 0.5s ease-in-out'
    });
    this.$('.full').css({
      height           : '100vh',
      'overflow-y'     : 'scroll',
      background       : 'rgba(216,205,183, 0.6)',
      WebkitTransition : 'height 0.5s ease-in-out, background 0.5s ease-in-out',
      MozTransition    : 'height 0.5s ease-in-out, background 0.5s ease-in-out',
      MsTransition     : 'height 0.5s ease-in-out, background 0.5s ease-in-out',
      OTransition      : 'height 0.5s ease-in-out, background 0.5s ease-in-out',
      transition       : 'height 0.5s ease-in-out, background 0.5s ease-in-out'
    });
    setTimeout(function () {
      this.$('.info').css({
        'overflow-y'     : 'inherit'
      });
    }.bind(this), 500);
  },

  showLess: function () {
    this.$('.title span').removeClass("glyphicon-menu-up");
    this.$('.title span').addClass("glyphicon-menu-down");
    this.$('.title').removeClass("less");
    this.$('.title').addClass("more");
    this.$('.info').css({
      height           : '0px',
      'overflow-y'     : 'hidden',
      WebkitTransition : 'height 0.5s ease-in-out',
      MozTransition    : 'height 0.5s ease-in-out',
      MsTransition     : 'height 0.5s ease-in-out',
      OTransition      : 'height 0.5s ease-in-out',
      transition       : 'height 0.5s ease-in-out'
    });
    this.$('.full').css({
      'overflow-y'     : 'visible',
      background       : 'rgba(216,205,183, 0)',
      WebkitTransition : 'height 0.5s ease-in-out, background 0.5s ease-in-out',
      MozTransition    : 'height 0.5s ease-in-out, background 0.5s ease-in-out',
      MsTransition     : 'height 0.5s ease-in-out, background 0.5s ease-in-out',
      OTransition      : 'height 0.5s ease-in-out, background 0.5s ease-in-out',
      transition       : 'height 0.5s ease-in-out, background 0.5s ease-in-out'
    });
  },

  render: function () {
    this.$el.html(this.template({
      author: this.model
    }));
    this.attachSubviews();
    return this;
  },

  addTrail: function (trail) {
    var marker = this.addMarker(trail);
    var view = new AcornTrail.Views.SearchItem({
      model: trail,
      marker: marker
    });
    this.addSubview(".trail-list", view);
  },

  removeTrail: function (trail) {
    this.removeModelSubview(".trail-list", trail)
  },



  addMarker: function (trail) {
    var location = new google.maps.LatLng(
      trail.trailHead.latitude,
      trail.trailHead.longitude
    )
    var marker = new google.maps.Marker({
      position: location,
      map: this._map,
      icon: "http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png",
      animation: google.maps.Animation.DROP,
      id: trail.get('id')
    });
    marker.setMap(this._map);
    this.markers.push(marker);
    marker.addListener('click', function() {
      Backbone.history.navigate('/trails/' + marker.id, { trigger: true })
    });
    this.markers.push(marker)
    return marker;
  },

  remove: function () {
    _(this.markers).each(function (marker) {
      marker.setMap(null);
      google.maps.event.clearInstanceListeners(marker);
    });

    Backbone.CompositeView.prototype.remove.call(this);
  }

});
