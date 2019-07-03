Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :categories, only: [:index, :update]
    resources :features, only: [:index, :update]
    resources :sessions, only: [:show, :update]
    resources :estimates, only: [:index, :create, :update]
    resources :platform, only: [:index, :create, :update]

    get 'categories_by_os', to: 'categories#find_by_os'
  end

end
