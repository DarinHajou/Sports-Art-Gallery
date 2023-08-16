export default {
    name: 'athleteBio',
    title: 'Athlete Bio',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Name of the athlete',
            validation: Rule => Rule.required().error('A name is required.')
            // Every athlete entry must have a unique name.
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            description: 'URL-friendly slug for the athlete',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Image of the athlete',
            validation: Rule => Rule.required().error('A image is required')
        },
        {
            name: 'sportCategory',
            title: 'Sport Category',
            type: 'reference',
            to: [{ type: 'sportCategory' }],
            description: 'The sport the athlete competes in',
            validation: Rule => Rule.required().error('A sport category is required.')
        },
        {
            name: 'bio',
            title: 'Biography',
            type: 'text',
            description: 'Biography or description of the athlete',
        },
        {
            name: 'birthDate',
            title: 'Birth Date',
            type: 'date',
            description: 'Date of birth of the athlete',
            validation: Rule => Rule.max(new Date().toISOString().split('T')[0]).error('Birth date cannot be in the future.')
        },
        {
            name: 'nationality',
            title: 'Nationality',
            type: 'string',
            description: 'Nationality of the athlete',
        },
        {
            name: 'careerTitles',
            title: 'Career Titles',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Titles won, records set, or notable achievements.',
        },
        {
            name: 'positionOrRole',
            title: 'Position or Role',
            type: 'string',
            description: 'Relevant for team sports (e.g., goalkeeper, midfielder). Optional for individual sports.',
        },
        {
            name: 'stats',
            title: 'Career Statistics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'statName',
                            type: 'string',
                            title: 'Statistic Name'
                        },
                        {
                            name: 'statValue',
                            type: 'string',
                            title: 'Statistic Value'
                        }
                    ],
                    name: 'stat'
                }
            ],
            description: 'Career statistics such as goals scored, matches played, points per game, etc.',
        },
        {
            name: 'careerTimeline',
            title: 'Career Timeline',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'date',
                            type: 'date',
                            title: 'Date'
                        },
                        {
                            name: 'event',
                            type: 'string',
                            title: 'Event or Milestone'
                        }
                    ],
                    name: 'careerEvent'
                }
            ],
            description: 'Key moments in the athlete\'s career like when they turned professional, significant transfers or milestone achievements.',
        }
    ]
};
