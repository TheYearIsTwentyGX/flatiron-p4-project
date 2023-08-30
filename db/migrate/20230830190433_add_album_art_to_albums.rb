class AddAlbumArtToAlbums < ActiveRecord::Migration[6.1]
  def change
    add_column :albums, :AlbumArt, :string
  end
end
