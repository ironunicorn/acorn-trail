class Api::TrailsController < ApplicationController
  def create
    @trail = current_user.authored_trails.new(trail_params)
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

  def feed
    @trails = trail_feed
    render 'feed'
  end

  def show
    @trail = Trail.includes(:acorn_stashes, :author, :reviews).find(params[:id])
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
      render json: @trail.errors.full_messages
    end
  end

  def search
    @trails = filter_trails(filter_options)
    render 'search'
  end

  private
  def trail_params
    params.require(:trail).permit(:title, :description)
  end

  def filter_options
    # options = params[:filter_data] || {}
    defaults = {
      'lat' => [37.67767358309138, 37.8887756788066],
      'lng' => [-122.56501542968749, -122.26838457031249]
    }

    # defaults.merge(options)
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
      Trail.includes(:trail_coordinates).find_by_sql([<<-SQL, binds])
        SELECT trails.*
        FROM trails
        INNER JOIN trail_coordinates ON trails.id = trail_coordinates.trail_id
        WHERE trail_coordinates.order = 0
        AND CAST(trail_coordinates.latitude AS float) BETWEEN :lat_min AND :lat_max
        AND CAST(trail_coordinates.longitude AS float) BETWEEN :lng_min AND 180
        OR CAST(trail_coordinates.longitude AS float) BETWEEN -180 AND :lng_max
      SQL
    else
      Trail.includes(:trail_coordinates).find_by_sql([<<-SQL, binds])
        SELECT trails.*
        FROM trails
        INNER JOIN trail_coordinates ON trails.id = trail_coordinates.trail_id
        WHERE trail_coordinates.order = 0
        AND CAST(trail_coordinates.latitude AS float) BETWEEN :lat_min AND :lat_max
        AND CAST(trail_coordinates.longitude AS float) BETWEEN :lng_min AND :lng_max
      SQL
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
end
