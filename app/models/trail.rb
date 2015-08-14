class Trail < ActiveRecord::Base
  belongs_to(
    :author,
    class_name: :User,
    foreign_key: :user_id,
    primary_key: :id
  )
  has_many :trail_coordinates, -> { order :order }, dependent: :destroy
  has_many :acorn_stashes, through: :trail_coordinates
  has_many :reviews

  validates :title, :author, presence: true

  def trail_head
    trail_coordinates.first
    # TrailCoordinate.find_by(trail_id: self.id, order: 0)
  end
end
