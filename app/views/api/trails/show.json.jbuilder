json.(@trail, :id, :title, :description, :user_id)

json.author @trail.author, :id, :username, :description, :image_url

json.reviews do
  json.array! @trail.reviews do |review|
    json.(review, :rating, :content, :created_at)
    json.reviewAuthor review.author, :username, :id
  end
end

json.trailCoordinates do
  json.array! @trail.trail_coordinates do |coord|
    json.(coord, :id, :latitude, :longitude, :order)

    if coord.acorn_stash
      json.acornStash coord.acorn_stash, :title, :description, :image_url
    end
  end
end
