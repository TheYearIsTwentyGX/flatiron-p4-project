class User < ApplicationRecord
  has_secure_password

  validates :password, presence: true, length: { minimum: 4 }, allow_nil: true
  validates :Username, presence: true, uniqueness: true
end
