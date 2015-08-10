# Phase 3: Editing and Displaying Acorn Stashes

## Rails
### Models
* AcornStash

### Controllers
* Api::AcornStashesController (create, destroy, update, edit, show)

### Views
* trips/show.json.jbuilder (add subarray of has_many acorn_stashes association)

## Backbone
### Models
* AcornStash

### Collections
* AcornStashes

### Views
* AcornStashForm subview
* AcornStashesForm (contains trip map preview and optional AcornStashForm Views)
* AcornStashShow subview of Trip

## Gems/Libraries
* Google Maps API
