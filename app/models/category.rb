class Category < ApplicationRecord
  validates :name, uniqueness: true
  has_many :features, dependent: :destroy

  def self.find_by_web(is_web)
    Category.find_by_sql("
    SELECT *
    FROM categories
    WHERE is_web = #{is_web}
  ")
  end
end
