 AcornTrail.Views.TrailSearch = Backbone.CompositeView.extend({
   template: JST['trail_search'],
   className: 'parent',
   render: function () {
     this.$el.html(this.template());
     this._map = new AcornTrail.Views.SearchMap({
       collection: this.collection
     });
     this.$('.google-maps-search').html(this._map.$el)
     this._map.render();
   }
 })
