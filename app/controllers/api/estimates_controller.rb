class Api::EstimatesController < ApplicationController

  def create
    Estimate.create(estimates_params)
  end

  private

    def estimates_params
      params.require(:estimate).permit(:customer_name, :customer_email)
    end
end
