class Api::FeaturesEstimatesController < ApplicationController
  before_action :set_estimate, only: [:index]

  def index
    render json: @estimate.features_estimates
  end
  
  def create
    # FeatureEstimate.post_all_features(params[:selectedFeatures], params[:estimate_id])
    render json: FeatureEstimate.post_all_features(params[:selectedFeatures], params[:estimate_id])
  end

  private 
  def set_estimate
    @estimate = Estimate.find(params[:estimate_id])
  end

end
