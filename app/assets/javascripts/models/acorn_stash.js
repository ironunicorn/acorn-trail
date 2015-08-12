AcornTrail.Models.AcornStashes = Backbone.Model.extend({

urlRoot: function () {
  return this.trail_coord.url() + "/acorn_stash";
},

initialize: function (params, options) {
  this.trail_coord = options.trail_coord;
}

});
