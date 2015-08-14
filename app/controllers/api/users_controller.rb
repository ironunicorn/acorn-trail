class Api::UsersController < ApplicationController
  before_action :require_current_user, only: :update
  def show
    @user = User.find(params[:id])
    @current_user = current_user
    render 'show'
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors.full_messages
    end
  end

  private
  def user_params
    params.require(:user).permit(:description, :image_url)
  end

  def require_current_user
    redirect_to root_url unless current_user == User.find(params[:id])
  end
end
