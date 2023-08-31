Rails.application.routes.draw do
  get "/session", to: "sessions#index"
  resources :reviews
  resources :albums
  resources :users
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  post "/logout", to: "sessions#destroy"
end
