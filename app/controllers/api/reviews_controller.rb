class Api::ReviewsController < ApplicationController
  before_action :ensure_current_user_is_not_author, only: :create

  def create
    @review = current_user.authored_reviews.new(review_params)
    if @review.save
      render json: @review
    else
      render json: @review.errors.full_messages
    end
  end

  def show
    @review = Review.find(params[:id])
    render 'show'
  end

  private
  def review_params
    params.require(:review).permit(:trail_id, :rating, :content)
  end

  def ensure_current_user_is_not_author
    trail = Trail.find(params[:id])
    redirect_to root_url unless current_user && current_user.id != trail.user_id
  end
end
