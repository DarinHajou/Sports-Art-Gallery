export default {
    name: 'sportCategory',
    title: 'Sport Category',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'The name of the sport.',
            validation: Rule => Rule.required().error('The sport title is required.')
            // A unique title to represent each sport category.
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            description: 'This is used to set up the URL for each sport.',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A short description of the sport.'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'A representative image for this sport.',
            validation: Rule => Rule.required().error('An image for the sport is required.')
        },
    ]
};
