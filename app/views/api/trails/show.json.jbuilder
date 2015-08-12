json.(@trail, :id, :title, :description)

json.trailCoordinates do
  json.array! @trail.trail_coordinates do |coord|
    json.(coord, :latitude, :longitude, :order)

    json.acornStash do
      json.array! coord.acorn_stash do |acorn_stash|
        json.(acorn_stash, :title, :description)
      end
    end
  end
end
