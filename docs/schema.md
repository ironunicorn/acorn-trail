# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
profile_pic_url | string    |
description     | text      |

## trails
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
title       | string    | not null
description | text      |

## trail_coordinates
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
trail_id    | integer   | not null, foreign key (references trails)
latitude    | string    | not null
longitude   | string    | not null
timestamp   | datetime  |
elevation   | float     |
order       | integer   | not null

## acorn_stashes
column name          | data type | details
---------------------|-----------|-----------------------
id                   | integer   | not null, primary key
trail_coordinate_id  | integer   | not null, foreign key (references trail_coordinates)
title                | string    | not null
image_url            | string    |
description          | text      |

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
trip_id     | integer   | not null, foreign key (references trips)
user_id     | integer   | not null, foreign key (references trips)
title       | string    | not null
description | text      |
rating      | integer   | not null
