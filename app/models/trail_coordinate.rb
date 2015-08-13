class TrailCoordinate < ActiveRecord::Base
  belongs_to :trail
  has_one :acorn_stash, dependent: :destroy
  validates :trail, :latitude, :longitude, presence: true
end
