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
  render: function () {
    this.$el.html(this.template({
      user: this.model
    }));
    return this;
  },
  upload: function(e) {
    e.preventDefault();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result){
      var data = result[0];
      this.$el.append("<input type='hidden' name=user[image_url] value='" + data.url +"'>");
      this.$(".profile-picture").html('<img src="' + data.url + '"<button class="image form-control">Update Profile Picture</button>')
    }.bind(this));
  },
  updateProfile: function (e) {
    e.preventDefault();
    var view = this;
    var formData = this.$el.serializeJSON().user;
    this.model.set(formData);
    this.model.save({}, {
      success: function () {
        view.render().$(".updated").html("<p>Updated!</p>")
      }
    });
  },
  cancel: function () {
    Backbone.history.navigate("", { trigger: true })
  }
});
