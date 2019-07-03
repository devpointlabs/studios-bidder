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

  def find_by_os
    render json: Category.find_by_os(params[:os])
  end


end
