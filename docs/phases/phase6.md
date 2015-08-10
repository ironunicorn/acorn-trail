# Phase 6: Reviews and Trip Feed

## Rails
### Models
* Review

### Controllers
* Api::TripsController (feed)
* Api::ReviewsController (create)

### Views
* trips/feed.json.jbuilder
* trips/show.json.jbuilder (add subarray of has_many reviews association +
  author username)

## Backbone
### Models
* Review

### Collections
* Reviews

### Views
* TripFeed
* ReviewForm
* ReviewIndex

## Gems/Libraries
