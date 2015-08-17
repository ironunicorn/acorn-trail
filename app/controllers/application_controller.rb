class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def login(user)
    session[:session_token] = user.reset_session_token!
    user.save!
    @current_user = user
  end

  def logout!
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  private
  def ensure_login
    redirect_to new_session_url unless current_user
  end

  def ensure_author
    trail = Trail.find(params[:trail_id])
    redirect_to root_url unless trail.user_id == current_user.id
  end

  def user_params
    params.require(:user).permit(:username, :password, :description)
  end

end
