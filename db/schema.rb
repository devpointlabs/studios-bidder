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

ActiveRecord::Schema.define(version: 2019_06_25_231344) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "estimates", force: :cascade do |t|
    t.string "customer_name"
    t.string "customer_email"
    t.integer "developer_day_rate"
    t.integer "designer_day_rate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "feature_estimates", force: :cascade do |t|
    t.bigint "feature_id"
    t.bigint "estimate_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["estimate_id"], name: "index_feature_estimates_on_estimate_id"
    t.index ["feature_id"], name: "index_feature_estimates_on_feature_id"
  end

  create_table "features", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.boolean "developer_boolean"
    t.bigint "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "multiplier"
    t.integer "base_days"
    t.boolean "is_android"
    t.boolean "is_ios"
    t.boolean "is_web"
    t.index ["category_id"], name: "index_features_on_category_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "quote_id"
    t.string "application"
    t.string "customer_email"
    t.integer "total_price"
    t.integer "application_price"
    t.integer "developer_day_rate"
    t.integer "designer_day_rate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.text "comments"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  add_foreign_key "feature_estimates", "estimates"
  add_foreign_key "feature_estimates", "features"
  add_foreign_key "features", "categories"
end
