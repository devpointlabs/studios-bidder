class Api::CategoriesController < ApplicationController

  def index
    # binding.pry
    render json: Category.find_by_web(params[:is_web])
  end

  def show
  end

  def update
  end

  def destroy
  end

end
