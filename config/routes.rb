Rails.application.routes.draw do

  root 'items#index'

  resources :items do
  	member do
  		post 'add_image'
  	end
  end
end
