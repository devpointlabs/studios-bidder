### NOTE

##  this aligns the category_ids for category and feature ONLY if you have
##   NOT previously made any data. 
##   if you have then run db:drop db:create db:migrate db:seed for this file
##   OR just adjust the last feature category_id line to be adjusted for your numbers.


# 10.times do |i|
#   Category.update((i+1),
#     is_exclusive: Faker::Boolean.boolean(0.7), 
#   )
# end

# puts("updated is_exclusive for category")


# 50.times do |j| 
#   Feature.update((j+1),
#     name: "feature in category # #{
#       (Feature.find_by_sql(
#         "SELECT category_id
#         FROM features
#         WHERE id = #{j+1}"
#         )
#       )
#     }"
#   )
# end

# end

# puts("features updated")


# 10.times do |i|
#   Category.create(
#     name: Faker::Lorem.word, 
#     is_android: Faker::Boolean.boolean(0.7),
#     is_ios: Faker::Boolean.boolean(0.7), 
#     is_web: Faker::Boolean.boolean(0.9),
#     list_location: (i+1),
#   )
# end

# 10.times do |k|
#   5.times do |j|
#     Feature.create(
#       name: "feature in category # #{k}", 
#       description: Faker::Lorem.paragraph_by_chars(150, false),
#       developer_boolean: Faker::Boolean.boolean(0.9),
#       base_days: Faker::Number.between(2, 12),
#       is_android: Faker::Boolean.boolean(0.7),
#       is_ios: Faker::Boolean.boolean(0.7), 
#       is_web: Faker::Boolean.boolean(0.9),
#       list_location: (j+1),
#       category_id: (k+1),
#   )
#   end
# end

# puts("seeded 10 categories & 5 features each category")