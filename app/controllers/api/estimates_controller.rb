class Api::EstimatesController < ApplicationController

  def create
    estimate = Estimate.new(estimates_params)
    if estimate.save
      render json: estimate.id
    else
      render json: estimate.errors, status:422
    end
  end

  private

    def estimates_params
      params.require(:estimate).permit(:customer_name, :customer_email)
    end
end
