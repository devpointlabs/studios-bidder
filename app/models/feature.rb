class Feature < ApplicationRecord
  belongs_to :category
  has_many :feature_estimates
  has_many :estimates, through: :feature_estimates
end
