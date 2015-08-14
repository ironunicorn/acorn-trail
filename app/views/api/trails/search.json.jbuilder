json.array! @trails do |trail|
  json.(trail, :id, :title, :description)
  json.trailHead trail.trail_head, :latitude, :longitude
end
