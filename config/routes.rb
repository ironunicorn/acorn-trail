Rails.application.routes.draw do
  root 'feeds#feed'

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:update, :show]
    get '/trails/search/', to: 'trails#search'
    get '/trails/feed/', to: 'trails#feed'
    resources :trails, only: [:create, :destroy, :index, :show, :update] do
      resources :trail_coordinates, only: [:create, :index]
      resources :reviews, only: [:create, :show]
    end
    resource :acorn_stash, only: :create
  end
end
