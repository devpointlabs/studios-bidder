class Category < ApplicationRecord
  validates :name, uniqueness: true
  has_many :features, dependent: :destroy

  def self.find_by_os(web, ios, android)
    if ios
      Category.find_by_sql("
      SELECT *
      FROM categories
      WHERE is_ios = true")
    elsif web
      Category.find_by_sql("
      SELECT *
      FROM categories
      WHERE is_web = true")
    elsif android
      Category.find_by_sql("
      SELECT *
      FROM categories
      WHERE is_android = true")
    end
  end

  # def self.find_by_ios
  #   Category.find_by_sql("
  #     SELECT *
  #     FROM categories
  #     WHERE is_ios = true")
  # end
  # def self.find_by_android
  #   Category.find_by_sql("
  #     SELECT *
  #     FROM categories
  #     WHERE is_android = true")
  # end
  # def self.find_by_web
  #   Category.find_by_sql("
  #     SELECT *
  #     FROM categories
  #     WHERE is_web = true")
  # end
end
