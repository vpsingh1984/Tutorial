Rails.application.routes.draw do

  devise_for :users
  
  root 'home#index'

  resources :items do
  	member do
  		post 'add_image'
  	end
  end
end
