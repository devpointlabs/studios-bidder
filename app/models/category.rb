class Category < ApplicationRecord
  validates :name, uniqueness: true
  has_many :features, dependent: :destroy
end
