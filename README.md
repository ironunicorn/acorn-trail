# AcornTrail

[See it live][heroku]

[heroku]: http://www.acorn-trail.com/

## Minimum Viable Product
AcornTrail is EveryTrail for Squirrels on Rails and Backbone. Squirrels can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create trails by drawing trails directly on map
- [x] Within trails, create acorn stash sites with images and comments
- [x] View trails and acorn stash sites
- [x] Edit current user and show author with image and description
- [x] Search for trails by location
- [x] Rate other trails out of 5 acorns
- [x] Review trails

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

### Phase 2: trail Creation and Display (~2 days)
I will add API routes to serve trail data as JSON, then add Backbone models and
collections that fetch data from those routes. My trail form will read selected
coordinates from GoogleMaps API and store the coordinates in the
trail_coordinates table in my database along with a title and description in
the trails table. By the end of this phase, users will be able to create and
view their own trails, all inside a single Backbone app.

[Details][phase-two]

### Phase 3: Editing and Displaying Acorn Stashes (~2 days)
I will add an `AcornStashForm` view for writing content and placing that content
on the `trailView` map with coordinates selected by the user. Users will be able
to add as many acorn stashes to their trail as they would like with a composite
view.

[Details][phase-three]

### Phase 4: Picture Uploads (~1 day)
I plan to use Cloudinary to add functionality to the `AcornStashForm`,
`trailshow`, and `EditProfile` views in this phase. I'll need
to integrate Cloudinary for file upload so users can add images to acorn stashes
and to their profiles.

[Details][phase-four]

### Phase 5: Searching for trails (~1 day)
I'll need to add a `search` route to the trails controller. On the Backbone
side, there will be a `SearchResults` view that shows results in a given radius
by trail head location with the Google Maps API. Place markers will expand with
details and link when clicked.

[Details][phase-five]

### Phase 6: Reviews and About Page(~2 days)
I'll create a `ReviewForm` and `ReviewView` to add to my `trailshow`
composite view. Then, I'll add an about page that will serve as my welcome page
by giving squirrels a brief overview of what AcornTrail does.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Public feed based on popularity
- [ ] Optional list search by miles from search spot
- [ ] Public feed also based on squirrel location
- [ ] Pagination/infinite scroll
- [ ] Create trails with gpx files
- [ ] Automatically place acorn stash on map based on image timestamp and gpx time



[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
