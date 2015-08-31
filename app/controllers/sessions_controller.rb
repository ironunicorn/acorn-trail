class SessionsController < ApplicationController
  def new
    @location = params["trailid"] || ''
    render 'new'
  end

  def create
    @user = User.find_by_credentials(
      user_params[:username],
      user_params[:password]
    )
    if @user
      login(@user)
      flash[:messages] = "Welcome, #{@user.username}!"
      if params["saved_url"] != ''
        redirect_to "/#/trails/#{params["saved_url"]}"
      else
        redirect_to root_url
      end
    else
      flash.now[:errors] = ["Invalid username or password"]
      render 'new'
    end
  end

  def destroy
    logout!
    render json: current_user, status: 200
  end
end
