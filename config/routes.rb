Rails.application.routes.draw do
  get 'platforms/index'
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :platforms, only: [:index, :create, :update] do
      resources :categories, only: [:index, :create]
    end

    resources :categories do
      resources :features, only: [:index, :create]
    end

    resources :platform, only:[:update]
    resources :category, only:[:update, :destroy]
    resources :features, only:[:update, :destroy]
    

    resources :sessions, only: [:show, :update]
    resources :estimates, only: [:index, :show, :create, :update]
    resources :features_estimates, only: [:index, :show, :create]

    get 'all_categories', to: 'categories#all_categories'
    get 'all_features', to: 'features#all_features'
    get 'features_by_platform', to: 'features#features_by_platform'
    # post 'estimate_email', to: 'estimates#estimate_email'
  end
  get '*other', to: 'static#index'

end
