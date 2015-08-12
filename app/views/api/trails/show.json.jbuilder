json.(@trail, :id, :title, :description)

json.trailCoordinates do
  json.array! @trail.trail_coordinates do |coord|
    json.(coord, :latitude, :longitude, :order);
  end
end
