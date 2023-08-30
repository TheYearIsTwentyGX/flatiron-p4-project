Rails.application.routes.draw do
  resources :reviews
  resources :albums
  resources :users
  post "/login", to: "sessions#create"
  post "/logout", to: "sessions#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
