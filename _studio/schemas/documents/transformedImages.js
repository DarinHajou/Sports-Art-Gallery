export default {
	name: 'transformationImages',
	title: 'Transformation Images',
	type: 'document',
	fields: [
	{
		name: 'name',
		title: 'Name',
		type: 'string',
		description: 'Name of the transformation image',
		validation: rule=> rule.required()
	},
	{
		name: 'slug',
		title: 'Slug',
		type: 'slug',
		options: {
			source: 'name',
			maxLength: 200,
		},
		description: 'URL-friendly version of the name',
	},
	{
		name: 'image',
		title: 'Image',
		type: 'image',
		options: {
			hotspot: true,
		},
		description: 'Image of the transformation',
		validation: rule=> rule.required()
	},
	{
		name: 'sport',
		title: 'Sport',
		type: 'reference',
		to: [{ type: 'sportCategory' }],
		description: 'Sport associated with the transformation image',
	},
  ],
};