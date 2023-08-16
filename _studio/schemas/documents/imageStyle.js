export default {
    name: 'imageStyle',
    title: 'Image Style',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Name of the image style',
            validation: Rule => Rule.required().error('A name for the image style is required.') 
            // Every image style entry must have a unique name.
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 200,
            },
            description: 'Slug for the image style',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Description of the image style',
        },
        {
            name: 'transformedImages',
            title: 'Transformed Image',
            type: 'reference',
            to: [{ type: 'transformedImages' }],
            description: 'Transformed image associated with the image style',
            validation: Rule => Rule.required().error('A transformed image reference is required.') 
        },
    ]
};
