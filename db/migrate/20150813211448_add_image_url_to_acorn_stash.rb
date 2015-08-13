class AddImageUrlToAcornStash < ActiveRecord::Migration
  def change
    add_column :acorn_stashes, :image_url, :string
  end
end
