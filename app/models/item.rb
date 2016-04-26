class Item

	include Mongoid::Document
	
	field :name, type: String
	field :category, type: String
	field :description, type: String
	field :image, type: String
	field :availability, type: Boolean

	embeds_many :pictures

	def as_json(*args)
		res = super

		res["_id"] = res["_id"].to_s

		res
	end

	def as_embedded
		res = as_document
		res["_id"] = res["_id"].to_s
		res
	end

end