AcornTrail.Views.AcornStashForm = Backbone.CompositeView.extend({
  template: JST['acorn_stash_form'],
  className: 'acorn-form',

  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    // this.trail_coordinate_id = options.trail_coordinate_id;
    this.map = options.map;
  },

  events: {
    "click .upload button": "upload",
    "click .close": "cancel",
    "click button.create": "close"
  },

  render: function () {
    this.$el.html(this.template({
      acornStash: this.model
    }));

    return this;
  },

  close: function (e) {
    e.preventDefault();
    this.setModel();
    this.$el.addClass('hidden');
  },

  setModel: function () {
    var formData = this.$('form').serializeJSON().acorn_stash;
    this.model.set(formData);
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
    if (this.model.get('image_url') || this.model.get('title') || this.model.get('description')) {
      this.close(e);
    } else {
      this.marker.void = 1;
      this.marker.setMap(null);
      this.remove();
    }
  }
});
