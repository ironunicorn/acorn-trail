AcornTrail.Views.TrailForm2b = Backbone.CompositeView.extend({
  template: JST['trail_form_2b'],

  events: {
    "click .reset": "resetMap",
    "click .create-trail": "createTrail"
  },
});
