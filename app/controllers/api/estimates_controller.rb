class Api::EstimatesController < ApplicationController

  def index
    render json: Estimate.all
  end

  def create
    estimate = Estimate.new(estimates_params)
    if estimate.save
      FeatureEstimate.post_all_features(params[:selectedFeatures], estimate.id )
      render json: estimate.id
      estimate_email(estimate)
    else
      render json: estimate.errors, status:418
    end
  end

  def estimate_email(estimate)
    EstimateMailer.estimate_email(current_user, estimate).deliver_now
    # render json: "Succesfully emailed"
  end

  private

    def estimates_params
      params.require(:estimate).permit(:customer_name, :customer_email, :design_value, :qaTesting_value, :deployment_value, :postDeploymentDev_value, :projectManagement_value, :generalBuffer_value, :design_multiplier, :qaTesting_multiplier, :deployment_multiplier, :postDeploymentDev_multiplier, :projectManagement_multiplier, :generalBuffer_multiplier, :total, :nonDevTotal)
    end
end
