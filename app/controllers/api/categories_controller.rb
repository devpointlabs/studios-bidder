class Api::CategoriesController < ApplicationController
  before_action :set_category, only: [:delete, :update]
  before_action :set_platform, only: [:index, :create]
  before_action :set_category, only: [:destroy, :update]

  def index
    render json: @platform.categories
  end

  def all_categories
    render json: Category.all
  end

  def show
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
    params.require(:category).permit(:name)
  end

  def set_platform
    @platform = Platform.find(params[:platform_id])
  end
end
