Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :categories, only: [:index, :update]
    resources :features, only: [:index, :update]
    resources :sessions, only: [:show, :update]

    # get "categories/ios", to: "categories#ios"
    # get "categories/android", to: "categories#android"
    # get "categories/web", to: "categories#web"
  end

end
