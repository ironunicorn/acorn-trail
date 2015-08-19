 AcornTrail.Views.TrailSearch = Backbone.CompositeView.extend({
   template: JST['trail_search'],
   className: 'parent',
   initialize: function () {
     this.addNavigationView();
   },
   render: function () {
     this.$el.html(this.template());
     this._map = new AcornTrail.Views.SearchMap({
       collection: this.collection
     });
     this.$('.google-maps-search').html(this._map.$el)
     this._map.render();
     this.attachSubviews();
   },

   addNavigationView: function () {
     var subview = new AcornTrail.Views.Navigation();
     this.addSubview('.navigation', subview);
   }
 })
