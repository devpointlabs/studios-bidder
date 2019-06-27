class Api::CategoriesController < ApplicationController

  def index
    render json: Category.find_by_os(params[:os])
  end

  def show
  end

  def update
  end

  def destroy
  end

end
