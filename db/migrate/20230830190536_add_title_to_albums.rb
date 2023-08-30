class AddTitleToAlbums < ActiveRecord::Migration[6.1]
  def change
    add_column :albums, :Title, :string
  end
end
