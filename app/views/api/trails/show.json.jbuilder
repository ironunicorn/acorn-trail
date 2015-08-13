json.(@trail, :id, :title, :description)

json.trailCoordinates do
  json.array! @trail.trail_coordinates do |coord|
    json.(coord, :id, :latitude, :longitude, :order)

    if coord.acorn_stash
      json.acornStash coord.acorn_stash, :title, :description
    end
  end
end
