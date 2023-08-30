class Review < ApplicationRecord
	belongs_to :album
	belongs_to :user

	validates :Title, presence: true, uniqueness: true
	validates :Body, presence: true
end
