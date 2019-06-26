class Category < ApplicationRecord
  has_many :features, dependent: :destroy
  validates :name, uniqueness: true

end
