class Api::TrailCoordinatesController < ApplicationController
  before_action :ensure_author

  def create
    @trail_coordinate = TrailCoordinate.new(trail_coord_params)
    if @trail_coordinate.save
      render json: @trail_coordinate
    else
      render json: @trail_coordinate.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @trail_coordinates = TrailCoordinate.where(trail_id: params[:id])
  end

  private
  def trail_coord_params
    params.require(:trail_coordinate).permit(
      :trail_id,
      :latitude,
      :longitude,
      :order
    )
  end
end
