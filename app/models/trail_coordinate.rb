class TrailCoordinate < ActiveRecord::Base
  belongs_to :trail
  has_one :acorn_stash
  validates :trail, :latitude, :longitude, presence: true
end
