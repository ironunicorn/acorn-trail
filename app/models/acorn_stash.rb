class AcornStash < ActiveRecord::Base
  belongs_to :trail_coordinate
  has_one :trail, through: :trail_coordinate
  validates :trail_coordinate, :title, presence: true
end
