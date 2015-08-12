class CreateAcornStashes < ActiveRecord::Migration
  def change
    create_table :acorn_stashes do |t|
      t.references :trail_coordinate, index: true, foreign_key: true, null: false
      t.string :title, null: false
      t.text :description

      t.timestamps null: false
    end
  end
end
