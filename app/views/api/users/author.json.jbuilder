json.(@user, :id, :username, :description, :image_url)

json.trails do
  json.array! @user.authored_trails do |trail|
    json.(trail, :id, :title, :description)
    json.trailHead trail.trail_coordinates.first, :latitude, :longitude
    json.acornImages do
      json.array! trail.acorn_stashes do |acorn_stash|
        json.ignore_nil!
        json.(acorn_stash, :image_url)
      end
    end
  end
end
