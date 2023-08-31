class AlbumsController < ApplicationController
  before_action :set_album, only: [:show, :update, :destroy]
  skip_before_action :authorize, only: [:index, :show]
  # GET /albums
  def index
    @albums = Album.all

    render json: @albums, each_serializer: AlbumSerializer
  end

  # GET /albums/1
  def show
    render json: @album, serializer: AlbumSerializer
  end

  # POST /albums
  def create
    @album = Album.new(album_params)

    if @album.save
      render json: @album, status: :created
    else
      render json: @album.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /albums/1
  def update
    if @album.update(album_params)
      render json: @album
    else
      render json: @album.errors, status: :unprocessable_entity
    end
  end

  # DELETE /albums/1
  def destroy
    @album.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_album
    @album = Album.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def album_params
    params.fetch(:album, {})
  end
end
