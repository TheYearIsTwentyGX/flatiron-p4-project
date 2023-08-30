class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.float :Score
      t.string :Title
      t.text :Body

      t.timestamps
    end
  end
end
