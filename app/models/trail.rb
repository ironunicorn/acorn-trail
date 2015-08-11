class Trail < ActiveRecord::Base
  belongs_to(
    :author,
    class_name: :User,
    foreign_key: :user_id,
    primary_key: :id
  )
  has_many :trail_coordinates, dependent: :destroy

  validates :title, :author, presence: true
end
