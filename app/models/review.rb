class Review < ApplicationRecord
  belongs_to :album
  belongs_to :user

  def allowed_to_edit?(session_user)
    errors.add(:base, "You can't edit this review") unless session_user == user.id
    puts "session_user: #{session_user}"
    errors.empty?
  end

  validates :Title, presence: true, uniqueness: true
  validates :Body, presence: true
end
