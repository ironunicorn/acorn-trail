class Api::TrailsController < ApplicationController
  def create
    @trail = current_user.trails.new(trail_params)
    if @trail.save
      render json: @trail
    else
      render json: @trail.errors.full_messages
    end
  end

  def index
    @trails = Trail.all
    render json: @trails
  end

  def show
    @trail = Trail.find(params[:id])
    render json: @trail
  end

  def destroy
    trail = Trail.find(params[:id])
    trail.destroy
    render json: trail
  end

  def update
    @trail = Trail.find(params[:id])
    if @trail.update(trail_params)
      render json: @trail
    else
      render json: @trail.errors.full_messages
    end
  end

  private
  def trail_params
    params.require(:trail).permit(:title, :description, :trail_coordinates)
  end
end
