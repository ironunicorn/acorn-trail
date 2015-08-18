AcornTrail.Views.EditProfile = Backbone.CompositeView.extend({
  template: JST['edit_profile'],
  tagName: "form",
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },
  events: {
    "click button.image": "upload",
    "submit": "updateProfile",
    "click button.cancel": "cancel"
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
        this.$el.append("<input type='hidden' name='user[image_url]' value='"
          + data.url +"'>");
        this.$(".profile-picture").html('<img src="'
          + data.url + '"/>');
      }
    }.bind(this));
  },
  updateProfile: function (e) {
    e.preventDefault();
    var view = this;
    var formData = this.$el.serializeJSON().user;
    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        view.updated = true;
      }
    });
  },
  cancel: function (e) {
    e.preventDefault();
    Backbone.history.navigate("", { trigger: true })
  }
});
