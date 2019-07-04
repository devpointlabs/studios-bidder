class Api::PlatformsController < ApplicationController
  def index
    render json: Platform.all
  end
end
