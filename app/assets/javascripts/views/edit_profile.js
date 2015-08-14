AcornTrail.Views.EditProfile = Backbone.CompositeView.extend({
  template: JST['edit_profile'],
  tagName: "form",
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },
  events: {
    "click button.image": "upload",
    "submit": "updateProfile"
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
      this.$('div.button').html('<p>Upload Complete</p>');
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
      },
      error: function (model, response) {
        return response;
      }
    });
  },
});
