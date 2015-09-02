class Api::TrailsController < ApplicationController
  before_action :ensure_login, only: [:create]
  before_action :ensure_author, only: [:update, :destroy]

  def create
    @trail = current_user.authored_trails.new(trail_params)
    if @trail.save
      render 'show'
    else
      render json: @trail.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    @trails = Trail.all
    render json: @trails
  end

  def feed
    @trails = trail_feed
    render 'feed'
  end

  def show
    @trail = Trail.eager_load([trail_coordinates: :acorn_stash],
                              :author,
                              [reviews: :author])
                  .find(params[:id])
    render 'show'
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
      render json: @trail.errors.full_messages, status: :unprocessable_entity
    end
  end

  def search
    @trails = filter_trails(filter_options)
    # render json: @trails
    render 'search'
  end

  private
  def trail_params
    params.require(:trail).permit(:title, :description)
  end

  def filter_options
    options = params[:filter_data] || {}
    defaults = {
      'lat' => [37.67767358309138, 37.8887756788066],
      'lng' => [-122.56501542968749, -122.26838457031249]
    }

    defaults.merge(options)
  end

  def filter_trails(filter_data)
    binds = {
      :lat_min => filter_data['lat'][0],
      :lat_max => filter_data['lat'][1],
      :lng_min => filter_data['lng'][0],
      :lng_max => filter_data['lng'][1]
    }

    if binds[:lng_min].to_f > binds[:lng_max].to_f
      # Wrap around the International Date Line
      Trail.includes(:trail_coordinates, :acorn_stashes)
           .references(:trail_coordinates)
           .where("trail_coordinates.order = 0 AND trail_coordinates.latitude BETWEEN :lat_min AND :lat_max AND trail_coordinates.longitude BETWEEN :lng_min AND 180 OR trail_coordinates.longitude BETWEEN -180 AND :lng_max")
    else
      Trail.includes(:trail_coordinates, :acorn_stashes)
           .references(:trail_coordinates)
           .where("trail_coordinates.order = 0 AND trail_coordinates.latitude BETWEEN :lat_min AND :lat_max AND trail_coordinates.longitude BETWEEN :lng_min AND :lng_max", binds)
    end
  end

  def trail_feed
    Trail.includes(:acorn_stashes).find_by_sql([<<-SQL])
      SELECT
        CAST(trails.created_at AS DATE) AS creation_date,
        trails.*,
        SUM(reviews.rating) / COUNT(reviews.id) AS average,
        COUNT(reviews.id) AS popularity
      FROM trails
      LEFT OUTER JOIN reviews ON trails.id = reviews.trail_id
      GROUP BY creation_date, trails.id
      ORDER BY creation_date DESC, average DESC, popularity DESC
    SQL
  end
  #
  # Trail.includes(:acorn_stashes).
  #      select("CAST(trails.created_at AS DATE) AS creation_date, trails.*, SUM(reviews.rating) / COUNT(reviews.id) AS average, COUNT(reviews.id) AS popularity").
  #      joins("LEFT OUTER JOIN reviews ON trails.id = reviews.trail_id").
  #      group("creation_date, trails.id").
  #      order("creation_date DESC, average DESC, popularity DESC")

end
