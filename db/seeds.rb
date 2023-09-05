# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Album.create(Artist: "KiNG MALA", Title: "honey catching season", TrackCount: 9, AlbumArt: "https://th.bing.com/th/id/OIP.FWn3zFVjTpECnCKP1LLqmgAAAA?pid=ImgDet&rs=1")
User.create!(Username: "DylanH", password: "6988", password_confirmation: "6988")
User.create!(Username: "admin", password: "admin", password_confirmation: "admin")
Review.create!(Title: "This is my favorite album!", Body: "Her best stuff.", user_id: 1, album_id: 1)
