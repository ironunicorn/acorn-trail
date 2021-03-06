# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150814160803) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "acorn_stashes", force: :cascade do |t|
    t.integer  "trail_coordinate_id", null: false
    t.string   "title",               null: false
    t.text     "description"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "image_url"
  end

  add_index "acorn_stashes", ["trail_coordinate_id"], name: "index_acorn_stashes_on_trail_coordinate_id", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "trail_id"
    t.integer  "rating"
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "reviews", ["trail_id"], name: "index_reviews_on_trail_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "trail_coordinates", force: :cascade do |t|
    t.integer  "trail_id"
    t.float    "latitude",   null: false
    t.float    "longitude",  null: false
    t.integer  "order",      null: false
    t.datetime "timestamp"
    t.float    "elevation"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "trail_coordinates", ["latitude", "longitude"], name: "index_trail_coordinates_on_latitude_and_longitude", using: :btree
  add_index "trail_coordinates", ["trail_id"], name: "index_trail_coordinates_on_trail_id", using: :btree

  create_table "trails", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "title",       null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "trails", ["user_id"], name: "index_trails_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.text     "description"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "image_url"
  end

  add_index "users", ["password_digest"], name: "index_users_on_password_digest", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree
  add_index "users", ["username"], name: "index_users_on_username", using: :btree

  add_foreign_key "acorn_stashes", "trail_coordinates"
  add_foreign_key "reviews", "trails"
  add_foreign_key "reviews", "users"
  add_foreign_key "trail_coordinates", "trails"
  add_foreign_key "trails", "users"
end
