class Api::AcornStashesController < ApplicationController
  def create
    @acorn_stash = AcornStash.new(acorn_stash_params)
    if @acorn_stash.save
      render json: @acorn_stash
    else
      render json: @acorn_stash.errors.full_messages
    end
  end

  private
  def acorn_stash_params
    params.require(:acorn_stash).permit(
      :trail_coordinate_id,
      :title,
      :description
    )
  end
end
