Rails.application.routes.draw do
  root 'feeds#feed'

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, :defaults => { :format => :json } do
    resources :trails, :only => [:create, :destroy, :index, :show, :update] do
      resources :trail_coordinates, :only => [:create] do
        resource :acorn_stash, :only => [:create]
      end
    end
  end


end
