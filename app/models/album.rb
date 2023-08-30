class Album < ApplicationRecord
	validates :Title, presence: true, uniqueness: true
	validates :TrackCount, presence: true, numericality: { only_integer: true }
	validates :Artist, presence: true

	has_many :reviews
	has_many :reviewers, through: :reviews, source: :user
end
