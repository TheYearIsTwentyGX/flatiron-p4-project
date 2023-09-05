class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_wrong_credentials
  skip_before_action :authorize, only: [:create]

  def index
    render json: {session: session, cookies: cookies.to_hash}
  end

  def create
    # Find user
    user = User.find_by!(Username: params[:Username])
    if user&.authenticate(params[:Password])
      session[:user_id] = user.id
      cookies.signed[:user_id] = user.id
      render json: {user: user}, status: :created
    else
      render_wrong_credentials
    end
  end

  def destroy
    session.delete :user_id
    cookies.delete :user_id
    head :no_content
  end

  private

  def render_wrong_credentials
    render json: {errors: ["Could not find a user with that username and password combination"]}, status: :unauthorized
  end
end
