class Api::FeaturesEstimatesController < ApplicationController
  def create

    feature_estimate = FeatureEstimate.new
    feature_estimate.post_all_features(params[:feature_id], params[:estimate_id])
  end
end
