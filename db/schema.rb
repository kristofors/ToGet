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

ActiveRecord::Schema.define(version: 20131219193639) do

  create_table "items", force: true do |t|
    t.integer  "list_id"
    t.integer  "quantity",                                  default: 1
    t.string   "item_name",                                 default: "New Item", null: false
    t.decimal  "approximate_cost", precision: 10, scale: 2, default: 0.0
    t.string   "source",                                    default: ""
    t.string   "source_url",                                default: ""
    t.text     "reason_for_item"
    t.boolean  "received",                                  default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "items", ["list_id"], name: "index_items_on_list_id", using: :btree

  create_table "lists", force: true do |t|
    t.string   "list_name",  default: "New List", null: false
    t.boolean  "active",     default: true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
