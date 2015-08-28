AcornTrail.Views.TrailShow = Backbone.CompositeView.extend({
  template: JST['trail_show'],

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this._map = options.map;
    this.listenTo(this.model.reviews(), "add", this.addReview);
    this.listenTo(this.model.reviews(), "remove", this.removeReview);
    this.model.reviews().each(this.addReview.bind(this));
    this.markers = [];
    if (options.currentUser) { this.currentUser = options.currentUser };
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
      'overflow-y'     : 'none',
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
      trail: this.model
    }));
    this.author();
    if (currentUserID !== -1 && this.model.get('user_id') !== currentUserID ) {
      this.reviewForm();
    }
    this.attachSubviews();
    this.addLinesAndAcorns();
    google.maps.event.addListener(this._map, 'click', function() {
      _(this.markers).each( function (marker) {
        marker.infowindow && marker.infowindow.close();
      })
    }.bind(this));
    return this;
  },

  author: function () {
    var view = new AcornTrail.Views.AuthorShow({ model: this.model.author() })
    this.$('.author').html(view.$el)
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
    var review = new AcornTrail.Models.Review({}, {trail: this.model});
    review.set({ trail_id: this.model.get('id') })
    var view = new AcornTrail.Views.ReviewForm({
      model: review,
      collection: this.model.reviews()
    });
    this.$(".review-form").html(view.$el);
    view.render();
  },

  addLinesAndAcorns: function () {
    var symbolOne = {
      path: 'M -2,0 0,-2 2,0 0,2 z',
      strokeColor: '#292',
      fillColor: '#292',
      fillOpacity: 1
    };

    var symbolTwo = {
      path: 'M -2,-2 2,2 M 2,-2 -2,2',
      strokeColor: '#F00',
      strokeWeight: 4
    };
    var trailPathLine = new google.maps.Polyline({
      path: this.route(),
      geodesic: true,
      strokeColor: '#664116',
      strokeOpacity: 1.0,
      strokeWeight: 4,
      icons: [{
          icon: symbolOne,
          offset: '0%'
        }, {
          icon: symbolTwo,
          offset: '100%'
      }]
    });
    this.markers.push(trailPathLine);
    trailPathLine.setMap(this._map);
  },

  route: function () {
    this._route = [];
    this.model.trailCoordinates().each(function (coord) {
      var location = new google.maps.LatLng(
        coord.get('latitude'),
        coord.get('longitude')
      )
      if (coord.get('order') === 0) {
        this._map.setCenter(location);
      }

      this._route.push(location);
      coord.acornStash().get('title') && this.addMarker(location, coord.acornStash());
    }.bind(this))

    return this._route
  },


  addMarker: function (location, acornStash) {
    var acornView = new AcornTrail.Views.AcornStashItem({
      model: acornStash
    });
    var infowindow = new google.maps.InfoWindow({
      content: acornView.el
    });
    acornView.render();
    var marker = new google.maps.Marker({
      position: location,
      map: this._map,
      infowindow: infowindow,
      icon: "http://res.cloudinary.com/disran0g3/image/upload/c_scale,h_38,w_34/v1439589233/better_acorn_nrfwkw.png"
    });
    marker.setMap(this._map);
    marker.addListener('mouseover', this.openInfo.bind(this, marker));
    this.markers.push(marker);
  },

  openInfo: function(marker) {
    _(this.markers).each(function (mark) {
      mark.infowindow && mark.infowindow.close();
    })
    marker.infowindow.open(this._map, marker);
  },

  remove: function () {
    _(this.markers).each(function (marker) {
      marker.infowindow && marker.infowindow.close();
      marker.setMap(null);
      google.maps.event.clearInstanceListeners(marker);
    });

    Backbone.CompositeView.prototype.remove.call(this);
  }

});
