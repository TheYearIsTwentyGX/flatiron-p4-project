class User < ApplicationRecord
  has_many :reviews, primary_key: :id, foreign_key: :user_id
  has_many :albums, through: :reviews
  has_secure_password

  validates :password, presence: true, length: {minimum: 4}, allow_nil: true
  validates :Username, presence: true, uniqueness: true
end
