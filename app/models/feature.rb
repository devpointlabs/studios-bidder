class Feature < ApplicationRecord
  validates :name, :description, :base_days, :multiplier, presence: true

  belongs_to :category
  has_many :feature_estimates
  has_many :estimates, through: :feature_estimates


  # def self.get_feature_by_category(category_id)
  #   Feature.find_by_sql("
  #     SELECT *
  #     FROM features
  #     WHERE category_id = #{category_id}
  #   ")
  # end
end
