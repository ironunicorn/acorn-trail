class Api::TrailCoordinatesController < ApplicationController
  def create
    @trail_coordinate = TrailCoordinate.new(trail_coord_params)
    if @trail_coordinate.save
      render json: @trail_coordinate
    else
      render json: @trail_coordinate.errors.full_messages
    end
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
