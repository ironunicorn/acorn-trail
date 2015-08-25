class UsersController < ApplicationController
  def new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      flash[:messages] = "Welcome, #{@user.username}!"
      redirect_to root_url
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
