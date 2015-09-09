class TrailCoordinate < ActiveRecord::Base
  belongs_to :trail, inverse_of: :trail_coordinates
  has_one :acorn_stash, dependent: :destroy, inverse_of: :trail_coordinate
  validates :trail, :latitude, :longitude, presence: true
  accepts_nested_attributes_for :acorn_stash
end
