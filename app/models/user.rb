class User < ActiveRecord::Base
  attr_reader :password

  after_initialize :ensure_session_token

  validates :username, presence: true, uniqueness: true
  validates :session_token, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many(
    :authored_trails,
    class_name: :Trail,
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :authored_reviews,
    class_name: :Review,
    foreign_key: :user_id,
    primary_key: :id
  )


  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    return user if user && user.is_password?(password)
    nil
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def generate_session_token
    SecureRandom.urlsafe_base64
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = generate_session_token
    self.save!
    self.session_token
  end
end
