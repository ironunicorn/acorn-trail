class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(
      user_params[:username],
      user_params[:password]
    )
    if @user
      login(@user)
      flash[:messages] = "Welcome, #{@user.username}!"
      redirect_to root_url
    else
      flash.new[:errors] = "Invalid username or password"
      render 'new'
    end
  end

  def destroy
    logout!
    redirect_to root_url
  end
end
