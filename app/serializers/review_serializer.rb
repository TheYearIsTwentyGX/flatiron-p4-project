class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :Writer, :Title, :Body, :album_id, :user_id, :created_at, :updated_at

  def Writer
  	object.user.Username
  end
end
