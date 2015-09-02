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
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def author
    @user = User.eager_load(authored_trails: [:trail_coordinates, :acorn_stashes])
                .find(params[:id])
    render 'author'
  end

  private
  def user_params
    params.require(:user).permit(:description, :image_url)
  end
end
