class CreateAlbums < ActiveRecord::Migration[6.1]
  def change
    create_table :albums do |t|
      t.string :Artist
      t.integer :TrackCount

      t.timestamps
    end
  end
end
