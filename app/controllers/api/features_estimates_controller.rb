class Api::FeaturesEstimatesController < ApplicationController
  before_action :set_estimate, only: [:index]

  def index
    render json: @estimate.features_estimates
  end
  
  def create
    feature_estimate = FeatureEstimate.new
    feature_estimate.post_all_features(params[:feature_id], params[:estimate_id])
  end

  private 
  def set_estimate
    @estimate = Estimate.find(params[:estimate_id])
  end

end
