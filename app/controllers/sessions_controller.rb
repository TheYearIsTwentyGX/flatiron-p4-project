class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_wrong_credentials
  def create
    # Find user
    user = User.find_by!(Username: params[:Username])
    if user&.authenticate(params[:Password])
      session[:user_id] = user.id
      cookies[:user_id] = user.id
      render json: user, status: :created
    else
      throw ActiveRecord::RecordNotFound
    end
  end

  def destroy
    session.delete :user_id
    cookies.delete :user_id
    head :no_content
  end

  def self.authorize(session)
    if session.include? :user_id
      return true
    end
    render json: {error: "Unauthorized"}, status: :unauthorized
  end

  private

  def render_wrong_credentials
    render json: {error: "Could not find a user with that username and password combination"}, status: :unauthorized
  end
end