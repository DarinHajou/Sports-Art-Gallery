import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './schemas/schemas.js';

export default {
	title: 'Sports Art Gallery',

	projectId: 'f8mgefqx',
	dataset: 'production',

	plugins: [
	deskTool(), 
	visionTool()
],

	schema: {
		types: schemas,
	},
};
