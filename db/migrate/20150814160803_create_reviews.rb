class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.references :user, index: true, foreign_key: true
      t.references :trail, index: true, foreign_key: true
      t.integer :rating
      t.text :content

      t.timestamps null: false
    end
  end
end
