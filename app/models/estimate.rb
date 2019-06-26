class Estimate < ApplicationRecord
  has_many :feature_estimates, dependent: :destroy
  has_many :features, through: :feature_estimates

end
