class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :Artist, :TrackCount, :AlbumArt, :Title, :ReviewCount

  def ReviewCount
	object.reviews.count
  end
end
