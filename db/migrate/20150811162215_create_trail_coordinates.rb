class CreateTrailCoordinates < ActiveRecord::Migration
  def change
    create_table :trail_coordinates do |t|
      t.references :trail, index: true, foreign_key: true
      t.string :latitude, null: false
      t.string :longitude, null: false
      t.integer :order, null: false
      t.datetime :timestamp
      t.float :elevation

      t.timestamps null: false
    end

    add_index :trail_coordinates, [:latitude, :longitude]
  end
end
