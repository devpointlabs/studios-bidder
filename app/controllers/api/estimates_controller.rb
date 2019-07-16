class Api::EstimatesController < ApplicationController

  def index
    render json: Estimate.all
  end

  def show
    render json: Estimate.find(params[:id])
  end 

  def create
    estimate = Estimate.new(estimates_params)
    if estimate.save
      FeatureEstimate.post_all_features(params[:selectedFeatures], estimate.id )
      render json: estimate.id
    else
      render json: estimate.errors, status:418
    end
  end

  private

    def estimates_params
      params.require(:estimate).permit(:customer_name, :customer_email, :design, :qaTesting, :deployment, :postDeploymentDev, :projectManagement, :generalBuffer)
    end
end
