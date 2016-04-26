class ItemsController < ApplicationController

	before_action :set_item, only: [:show, :add_image]
	respond_to :html, :json
	def index
		respond_to do |f|
			f.html
			f.json do
				file = JSON.parse(File.read('data/items.json'))
				if params[:id].present?
					item = file.select { |item| item["id"] == params[:id].to_i}.first
					render json: item
				else
					@items = Item.all
					render json: @items.as_json
				end
			end
		end
	end

	def create
		item = Item.new(item_params)
		if item.save
			render json: { status: 200, item: item }
		else
			render json: { status: 500 }
		end
	end

	def show
		respond_with(@item.as_embedded.to_json)
	end

	def add_image
		pic = @item.pictures.new
		pic.image = params[:file]
		pic.save
		set_item()
		respond_with(@item)
	end

	private

	def item_params
		params.require(:item).permit!
	end

	def set_item
		@item = Item.find_by(id: params[:id])
	end
	# def data
	# 	file = JSON.parse(File.read('data/items.json'))
	# 	if params[:id].present?
	# 		item = file.select { |item| item["id"] == params[:id].to_i}.first
	# 		render json: item
	# 	else
	# 		render json: file
	# 	end
	# end
end
