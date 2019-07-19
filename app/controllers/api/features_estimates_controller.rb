class Api::FeaturesEstimatesController < ApplicationController
  before_action :set_estimate, only: [:index, :show]

  def index
    @estimate = Estimate.find(params[:estimate_id])
    render json: @estimate.features_estimates
  end

  def show
    render json: @estimate.feature_estimates
  end
  
  def create
    # FeatureEstimate.post_all_features(params[:selectedFeatures], params[:estimate_id])
    render json: FeatureEstimate.post_all_features(params[:selectedFeatures], params[:estimate_id])
  end

  def featureIDs_from_estimate
    render json: FeatureEstimate.get_feature_IDs(params[:estimate_id])
  end

  private 
  def set_estimate
    @estimate = Estimate.find(params[:estimate_id])
  end

end
