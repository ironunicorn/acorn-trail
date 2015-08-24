AcornTrail.Views.EditProfile = Backbone.CompositeView.extend({
  template: JST['edit_profile'],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },
  events: {
    "click button.image": "upload",
    "click .update": "updateProfile",
    "click .close": "cancel"
  },
  editDescription: function () {
    this.$(".description").html("<textarea name='user[description]' class='form-control'>"
      + this.model.escape('description') + "</textarea>")
  },
  render: function () {
    this.$el.html(this.template({
      user: this.model
    }));
    if (this.updated) {
      this.$(".updated").html("<div class='alert alert-success'>Updated!</div>");
    }
    return this;
  },
  upload: function(e) {
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      if (result) {
        var data = result[0];
        this.$('input.image').val(data.url);
        this.$(".image-space").html('<img src="'
          + data.url + '"/>');
      }
    }.bind(this));
  },
  updateProfile: function (e) {
    e.preventDefault();
    var view = this;
    var formData = this.$('form').serializeJSON().user;
    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        view.updated = true;
        setTimeout(function(){ Backbone.history.navigate("/explore", { trigger: true }) }, 750);
      }
    });
  },
  cancel: function (e) {
    e.preventDefault();
    Backbone.history.navigate("/explore", { trigger: true })
  }
});
