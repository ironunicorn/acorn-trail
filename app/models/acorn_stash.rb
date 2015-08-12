class AcornStash < ActiveRecord::Base
  belongs_to :trail_coordinate
  validates :trail_coordinate, :title, presence: true
end
