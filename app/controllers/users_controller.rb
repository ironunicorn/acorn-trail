class UsersController < ApplicationController
  before_action :ensure_logged_out, only: :create
  before_action :ensure_login, only: :destroy

  def create
    @user = User.new(user_params)
    if @user
      login(@user)
      flash[:messages] = "Welcome, #{@user.username}!"
      if params["saved_url"] != ''
        redirect_to "/#/trails/#{params["saved_url"]}"
      else
        redirect_to root_url
      end
    else
      flash.now[:errors] = @user.errors.full_messages
      render 'sessions/new'
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    redirect_to root_url
  end
end
