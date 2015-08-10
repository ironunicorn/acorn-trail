# AcornTrail

[Heroku link][heroku]

[heroku]: http://acorn-trail.herokuapp.com/

## Minimum Viable Product
AcornTrail is EveryTrail for Squirrels on Rails and Backbone. Squirrels can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create trips with gps files
- [ ] Within trips, create acorn stash sites with photos and comments
- [ ] Account avatars
- [ ] View trips and acorn stash sites
- [ ] Search for trips by location
- [ ] Rate other trips out of 5 acorns
- [ ] Review trips
- [ ] Public feed based on popularity

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~0.5 days)
I will implement user authentication in Rails based on the practices learned at
App Academy. The most important part of this phase will be pushing the app to
Heroku and ensuring that everything works before moving on to phase 2.

[Details][phase-one]

### Phase 2: Trip Creation and Display (~2 days)
I will add API routes to serve trip data as JSON, then add Backbone models and
collections that fetch data from those routes. My trip form will read gpx files
and store the contents in the trip_route field in my database along with a title
and description. I will then call the Google Maps API by the starting
coordinates and draw the rest of the trip with JavaScript. By the end of this
phase, users will be able to create and view their own trips, all inside a
single Backbone app.

[Details][phase-two]

### Phase 3: Editing and Displaying Acorn Stashes (~2 days)
I will add an `AcornStashForm` view for writing content and placing that content
on the `TripView` map with coordinates selected by the user. Users will be able
to add as many acorn stashes to their trip as they would like with a composite
view.

[Details][phase-three]

### Phase 4: Picture Uploads (~1 day)
I plan to use Filepicker to add functionality to the `AcornStashForm`,
`TripShow`, and `EditProfile` views in this phase. I'll need
to integrate Filepicker for file upload so users can add images to acorn stashes
and to their profiles.

[Details][phase-four]

### Phase 5: Searching for Trips (~1 day)
I'll need to add a `search` route to the trips controller. On the Backbone
side, there will be a `SearchResults` view that shows results in a given radius
with the Google Maps API. Place markers will expand with details and link when
clicked.

[Details][phase-five]

### Phase 6: Reviews and Trip Feed (~2 days)
I'll start by creating a `ReviewForm` and `ReviewView` to add to my `TripShow`
composite view. The average rating and number of reviews will determine the
order in which trips are displayed on the `TripFeed` page from a Backbone
collection. This will be the first page users see whether they are logged in or
not.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Automatically place acorn stash on map based on picture timestamp
- [ ] Optional list search by miles from search spot
- [ ] Public feed also based on squirrel location
- [ ] Pagination/infinite scroll
- [ ] Draw trails directly on map without gps file
- [ ] View squirrel profiles
- [ ] Custom feed for signed in squirrels based on rating history


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
