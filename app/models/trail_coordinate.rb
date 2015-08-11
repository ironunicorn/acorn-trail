class TrailCoordinate < ActiveRecord::Base
  belongs_to :trail

  validates :trail, :latitude, :longitude, presence: true
end
