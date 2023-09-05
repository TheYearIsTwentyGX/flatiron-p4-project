class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :update, :destroy]

  # GET /reviews
  def index
    @reviews = Review.all

    render json: @reviews
  end

  # GET /reviews/1
  def show
    render json: @review
  end

  # POST /reviews
  def create
    review_params[:user_id] ||= session[:user_id]
    puts review_params[:user_id]
    @review = Review.new(review_params)

    if @review.save
      render json: @review, status: :created
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /reviews/1
  def update
    if @review.allowed_to_edit?(session[:user_id])
      @review.update(review_params)
      render json: @review
    else
      render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def user_reviews
    @reviews = User.find(params[:id]).reviews
    if @reviews.count < 1
      render json: {errors: ["No reviews found"]}, status: :not_found
      return
    end
    @reviews = @reviews.map do |review|
      {
        album: review.album,
        review: review
      }
    end
    render json: @reviews
  end

  # DELETE /reviews/1
  def destroy
    @review.destroy if @review.allowed_to_edit?(session[:user_id])
    if @review.errors.empty?
      render nothing: true, status: :no_content
    else
      render json: {errors: @review.errors.full_messages}, status: :unauthorized
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_review
    @review = Review.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def review_params
    params.require(:review).permit(:Title, :Body, :user_id, :album_id)
  end
end
