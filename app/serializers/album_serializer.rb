class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :Artist, :TrackCount, :AlbumArt, :Title, :ReviewCount, :Reviews

  def ReviewCount
    object.reviews.count
  end

  def Reviews
    object.reviews.map do |review|
      {
        Writer: review.user.Username,
        **review.attributes
      }
    end
  end

  private
end
