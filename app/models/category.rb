class Category < ApplicationRecord
  validates :name, presence: true
  
  belongs_to :platform
  has_many :features, dependent: :destroy

  def self.find_by_os(os)
    case os
    when 'ios'
      Category.find_by_sql("
      SELECT id, name, is_android, is_ios, is_web, list_location, is_exclusive
      FROM categories
      WHERE platform_id = 1")
    when 'web'
      Category.find_by_sql("
      SELECT id, name, is_android, is_ios, is_web, list_location, is_exclusive
      FROM categories
      WHERE platform_id = 3")
    when 'android'
      Category.find_by_sql("
      SELECT id, name, is_android, is_ios, is_web, list_location, is_exclusive
      FROM categories
      WHERE platform_id = 2")
    end
  end

end
