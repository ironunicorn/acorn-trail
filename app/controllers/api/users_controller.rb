class Api::UsersController < ApplicationController
  before_action :ensure_login, only: :update
  def show
    @user = User.find(params[:id])
    render 'show'
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render 'show'
    else
      render json: @user.errors.full_messages
    end
  end

  private
  def user_params
    params.require(:user).permit(:description, :image_url)
  end
end
