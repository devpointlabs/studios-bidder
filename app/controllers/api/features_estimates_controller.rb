class Api::FeaturesEstimatesController < ApplicationController
  before_action :set_estimate, only: [:index]

  def index
    render json: @estimate.features_estimates
  end
  
  def create
    # FeatureEstimate.post_all_features(params[:selectedFeatures], params[:estimate_id])
    estimate = params[:estimate]
    render json: FeatureEstimate.post_all_features(params[:selectedFeatures], params[:estimate_id])
    estimate_email(estimate)
    
  end

  def featureIDs_from_estimate
    render json: FeatureEstimate.get_feature_IDs(params[:estimate_id])
  end


  private 

  def estimate_email(estimate)
    email = "chad.m.carlson@gmail.com"
    EstimateMailer.estimate_email(email, estimate).deliver_now
    # render json: "Succesfully emailed"
  end

  def set_estimate
    @estimate = Estimate.find(params[:estimate_id])
  end

end
