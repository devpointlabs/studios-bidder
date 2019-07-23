class Feature < ApplicationRecord
  validates :name, :description, :base_days, :multiplier, presence: true

  belongs_to :category
  has_many :feature_estimates
  has_many :estimates, through: :feature_estimates


  def self.get_features_by_platform(platform_id)
    Feature.find_by_sql("
      SELECT *
      FROM features
      WHERE platform_id = #{platform_id}
    ")
  end

  def self.get_features_active
    Feature.find_by_sql("
      SELECT *
      FROM features
      WHERE is_active = true
    ")
  end

  def self.get_all_features
    Feature.find_by_sql("
    SELECT id, name, description, base_days, platform_id, category_id, is_active, 
    FROM features
    
    ")
  end
  
end
