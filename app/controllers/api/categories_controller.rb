class Api::CategoriesController < ApplicationController

  def index
    render json: Category.all
  end

  def show
  end

  def update
  end

  def destroy
  end

end
