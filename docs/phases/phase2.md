# Phase 2: Trip Creation and Display

## Rails
### Models
* Trip

### Controllers
* Api::TripsController (create, destroy, update, edit, show)

### Views
* trips/show.json.jbuilder

## Backbone
### Models
* Trip (special route parser)
<!-- Would the route parser be more efficient here or in the json builder view? -->

### Collections
* Trips

### Views
* TripForm
* TripShow (Composite view, will contain AcornStashIndex and ReviewIndex
  subviews. Also will display and configure Google Map)

## Gems/Libraries
* Google Maps API
