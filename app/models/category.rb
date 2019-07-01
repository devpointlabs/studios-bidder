class Category < ApplicationRecord
  has_many :features, dependent: :destroy
end
