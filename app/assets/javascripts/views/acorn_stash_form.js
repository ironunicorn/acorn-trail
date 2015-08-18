AcornTrail.Views.AcornStashForm = Backbone.CompositeView.extend({
  template: JST['acorn_stash_form'],
  tagName: 'form',

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.trail_coordinate_id = options.trail_coordinate_id;
    this.map = options.map;
  },

  events: {
    "click .upload button": "upload",
    "click button.cancel": "cancel",
    "blur input, textarea": "setModel"
  },

  render: function () {
    this.$el.html(this.template({
      acornStash: this.model
    }));

    return this;
  },

  setModel: function (e) {
    var formData = this.$el.serializeJSON().acorn_stash;
    this.model.set(formData);
  },

  createStash: function () {
    this.model.set({
      trail_coordinate_id: this.trail_coordinate_id,
    });
    var formData = this.$el.serializeJSON().acorn_stash;
    this.model.set(formData);
    this.model.save({}, {
      error: function (model, response) {
        return response;
      }
    });
  },

  upload: function(e) {
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      if (result) {
        var data = result[0];
        this.$('input.image').val(data.url);
        this.$('div.upload').html('<div class="alert alert-success">Picture Uploaded</div><button class="btn btn-primary">Edit Picture</button>');
        this.setModel();
      }
    }.bind(this));
  },

  cancel: function(e) {
    e.preventDefault();
    this.marker.void = 1;
    this.marker.setMap(null);
    this.remove();
  }


})
