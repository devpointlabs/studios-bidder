class Api::FeaturesController < ApplicationController

  def index
    render json: Feature.all
    # render json: Feature.get_feature_by_category(params[:category_id])
  end

  def show
  end

  def update
  end

  def destroy
  end

end
