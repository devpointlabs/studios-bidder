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

    # put :update_active_category
    # put :update_active_feature
    
    resources :platform, only:[:update]
    resources :category, only:[:update, :destroy]
    resources :features, only:[:update, :destroy]

    resources :sessions, only: [:show, :update]
    resources :estimates, only: [:index, :show, :create, :update]
    resources :features_estimates, only: [:index, :show, :create]

    get 'all_categories', to: 'categories#all_categories'
    get 'all_active_categories', to: 'categories#all_active_categories'
    get 'all_active_features', to: 'features#all_active_features'
    put 'update_active_feature/:id', to: 'features#update_active_feature'
    put 'update_active_category/:id', to: 'categories#update_active_category'
    get 'all_features', to: 'features#all_features'
    get 'features_by_platform', to: 'features#features_by_platform'
    get 'featureIDs_from_estimate/:estimate_id', to: 'features_estimates#featureIDs_from_estimate'
    # post 'estimate_email', to: 'estimates#estimate_email'
  end
  get '*other', to: 'static#index'

end
