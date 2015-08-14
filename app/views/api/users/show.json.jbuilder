json.(@user, :id, :username, :description, :image_url)
if @current_user
  json.current_user @current_user, :id, :username, :description, :image_url
end
