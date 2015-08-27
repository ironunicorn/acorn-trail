class Review < ActiveRecord::Base
  validates :rating, numericality: {
    only_integer: true,
    greater_than: 0,
    less_than_or_equal_to: 5,
    message: "Please submit a rating of 1-5 acorns."
  }
  belongs_to(
    :author,
    class_name: :User,
    foreign_key: :user_id,
    primary_key: :id
  )
  belongs_to :trail
end
