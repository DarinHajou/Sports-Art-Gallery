export default {
    name: 'transformedImages',
    title: 'Transformed Images',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Name of the transformation image',
            validation: Rule => Rule.required().error('The name of the transformation image is required.')
            // Unique name representing each transformed image.
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
            validation: Rule => Rule.required().error('A slug for the transformation image is required.').custom(slug => {
                // Check if slug is unique, return true if it's unique, else return an error message.
                // To ensure unique and SEO-friendly URLs for transformed images.
             }) 
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Image of the transformation',
            validation: Rule => Rule.required().error('An image for the transformation is required.')
        },
        {
            name: 'athleteBio',
            title: 'Athlete Bio',
            type: 'reference',
            to: [{ type: 'athleteBio' }],
            description: 'Athlete associated with the transformation image'
            // Link to the athlete for whom the transformation image was created.
        },
        {
            name: 'sportCategory',
            title: 'Sport Category',
            type: 'reference',
            to: [{ type: 'sportCategory' }],
            description: 'Sport associated with the transformation image'
            // Link to the specific sport that the transformation image represents or is relevant to.
        },
        {
            name: 'imageStyle',
            title: 'Image Style',
            type: 'reference',
            to: [{ type: 'imageStyle' }],
            description: 'Image style associated with the transformation image',
            // Link to the style or design specifics that were used in the transformation.
        }
    ]
};
