class Trail < ActiveRecord::Base
  belongs_to(
    :author,
    class_name: :User,
    foreign_key: :user_id,
    primary_key: :id
  )
  has_many :trail_coordinates, dependent: :destroy
  has_many :acorn_stashes, through: :trail_coordinates

  validates :title, :author, presence: true

  def trail_head
    
  end
end
