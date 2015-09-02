Rails.application.routes.draw do
  root 'feeds#feed'

  get '/signin', to: 'sessions#new'

  resources :users, only: [:new, :create]
  resource :session, only: [:create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:update, :show]
    get '/trails/search/', to: 'trails#search'
    get '/trails/feed/', to: 'trails#feed'
    get '/authors/:id/', to: 'users#author'
    resources :trails, only: [:create, :destroy, :index, :show, :update] do
      resources :trail_coordinates, only: [:create, :index]
      resources :reviews, only: [:create, :show]
    end
    resource :acorn_stash, only: :create
  end
end
