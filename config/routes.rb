Rails.application.routes.draw do
  root 'feeds#feed'

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    get '/trails/search/', to: 'trails#search'
    get '/trails/feed/', to: 'trails#feed'
    resources :trails, only: [:create, :destroy, :index, :show, :update] do
      resources :trail_coordinates, only: [:create, :index] do
      end
    end
    resources :users, only: [:update, :show]
    resource :acorn_stash, only: :create
    resources :reviews, only: [:create, :show]
  end
end
