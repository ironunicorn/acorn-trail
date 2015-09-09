class Trail < ActiveRecord::Base
  belongs_to(
    :author,
    class_name: :User,
    foreign_key: :user_id,
    primary_key: :id
  )
  has_many(
    :trail_coordinates,
    -> { order :order },
    dependent: :destroy,
    inverse_of: :trail
  )
  has_many :acorn_stashes, through: :trail_coordinates
  has_many :reviews

  accepts_nested_attributes_for :trail_coordinates, :acorn_stashes

  validates :title, :author, presence: true

  def trail_head
    trail_coordinates.first
  end
end
