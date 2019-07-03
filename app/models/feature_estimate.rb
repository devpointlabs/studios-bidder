class FeatureEstimate < ApplicationRecord
  validates :feature_id, uniqueness: {scope: :estimate_id}

  belongs_to :feature
  belongs_to :estimate
end
