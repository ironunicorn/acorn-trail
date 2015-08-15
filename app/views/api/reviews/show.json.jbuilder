json.(@review, :rating, :created_at, :content)
json.reviewAuthor review.author, :username
  json.(trail, :id, :title, :description)
  json.trailHead trail.trail_head, :latitude, :longitude
end
