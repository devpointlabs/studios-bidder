class Api::CategoriesController < ApplicationController
  before_action :set_platform, only: [:index, :create]
  before_action :set_category, only: [:destroy, :update, :update_active_category]

  def index
    render json: @platform.categories
  end

  def all_categories
    render json: Category.all
  end

  def show
  end

  def all_active_categories
    render json: Category.get_categories_active
  end

  def update_active_category
    if @category.update(is_active: false) && @category.features.update(is_active: false)
      render json: @category
    else
      render json: @category.errors, status:422
    end
  end

  def create
    category = @platform.categories.new(category_params)
    if category.save
      render json: category
    else
      render json: category.errors, status:422
    end
  end

  def update
    if @category.update(category_params)
      binding.pry
      render json: @category
    else
      render json: @category.errors, status:422
    end
  end

  def destroy
    @category.destroy
  end

private
  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :is_exclusive)
  end

  def set_platform
    @platform = Platform.find(params[:platform_id])
  end
end
