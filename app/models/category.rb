class Category < ApplicationRecord
  validates :name, uniqueness: true
  has_many :features, dependent: :destroy

  def self.find_by_os(os)
    case os
    when 'ios'
      Category.find_by_sql("
      SELECT id, name, is_android, is_ios, is_web, list_location
      FROM categories
      WHERE is_ios = true")
    when 'web'
      Category.find_by_sql("
      SELECT id, name, is_android, is_ios, is_web, list_location
      FROM categories
      WHERE is_web = true")
    when 'android'
      Category.find_by_sql("
      SELECT id, name, is_android, is_ios, is_web, list_location
      FROM categories
      WHERE is_android = true")
    end
  end

end
