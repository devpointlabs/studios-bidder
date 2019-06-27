class Api::CategoriesController < ApplicationController

  def index
    render json: Category.find_by_os(params[:is_web], params[:is_ios], params[:is_android])
  end

  # def ios
  #   render json: Category.find_by_ios
  # end
  # def android
  #   render json: Category.find_by_android
  # end
  # def web
  #   render json: Category.find_by_web
  # end

  def show
  end

  def update
  end

  def destroy
  end

end
