class Api::CategoriesController < ApplicationController

  def index
<<<<<<< HEAD
    render json: Category.all
=======
    render json: Category.find_by_os(params[:os])
>>>>>>> b2e408dba5bb49bfbc824e6e700e527d00793076
  end

  def show
  end

  def update
  end

  def destroy
  end

end
