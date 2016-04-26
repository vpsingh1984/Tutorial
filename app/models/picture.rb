class Picture

	include Mongoid::Document
	include Mongoid::Paperclip

	has_mongoid_attached_file :image,
	styles: {
		small: ['180x180', :jpg],
		medium: ['250x250', :jpg],
		large: ['600x600', :jpg],
		original: ['800x800', :jpg]
	},
	path: ":rails_root/public/system/:class/:attachment/:id/:style/:filename",
	url: "/system/:class/:attachment/:id/:style/:filename"

	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
	embedded_in :item

	def as_document
		res = super
		res["small"] = self.image.url(:small)
		res["medium"] = self.image.url(:medium)
		res["large"] = self.image.url(:large)
		res["original"] = self.image.url(:original)
		res
	end
end