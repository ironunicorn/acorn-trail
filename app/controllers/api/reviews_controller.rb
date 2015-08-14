class Api::ReviewsController < ApplicationController
  before_action :ensure_login

  def create
    @review = current_user.authored_reviews.new(review_params)
    if @review.save
      render json: @review
    else
      render json: @review.errors.full_messages
    end
  end

  private
  def review_params
    params.require(:review).permit(:trail_id, :rating, :content)
  end
end
