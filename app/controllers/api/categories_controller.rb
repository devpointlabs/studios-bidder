class Api::CategoriesController < ApplicationController
  before_action :set_category, only: [:delete, :update]
  before_action :set_platform, only: [:index, :create, :update]
  before_action :set_category, only: [:destroy]

  def index
    render json: Platform.categories
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
    @category.update()
  end

  def destroy
    @category.destroy
  end

private
  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name,:platform_id)
  end

  def set_platform
    @platform = Platform.find(params[:platform_id])
  end
end
