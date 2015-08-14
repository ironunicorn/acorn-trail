json.(@trail, :id, :title, :description)

json.author @trail.author, :username, :description, :image_url

json.trailCoordinates do
  json.array! @trail.trail_coordinates do |coord|
    json.(coord, :id, :latitude, :longitude, :order)

    if coord.acorn_stash
      json.acornStash coord.acorn_stash, :title, :description, :image_url
    end
  end
end
