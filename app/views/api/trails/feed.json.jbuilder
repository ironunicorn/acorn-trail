json.array! @trails do |trail|
  json.(trail, :id, :title, :description)
  json.acornImages do
    json.array! trail.acorn_stashes do |acorn_stash|
      json.ignore_nil!
      json.(acorn_stash, :image_url)
    end
  end
end
