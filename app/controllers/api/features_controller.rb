class Api::FeaturesController < ApplicationController
before_action :set_category, only: [:index, :create]
before_action :set_feature, only: [:update, :destroy]

  def index
    render json: @category.features
    # render json: Feature.get_feature_by_category(params[:category_id])
  end

  def create
    feature = @category.features.new(feature_params)
    if feature.save
      render json: feature
    else
      render json: feature.errors, status:422
    end
  end

  def show
  end

  def update
  end

  def destroy
    @feature.delete
  end

  private
  def set_feature
    @feature = Feature.find(params[:id])
  end

  def set_category
    @category = Category.find(params[:category_id])
  end

  def feature_params
    params.require(:feature).permit(:name, :description, :base_days, :multiplier, :category_id)
  end


end
