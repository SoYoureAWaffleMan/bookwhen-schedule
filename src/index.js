/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './schedule-style.scss';

/**
 * Internal dependencies
 */
import Edit from './bookwhen-schedule-edit';
import save from './bookwhen-schedule-save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('bookwhen/schedule', {

	title:'Bookwhen Schedule',

	class:'ONE',
	className:'TWO',

  description: 'Render your Bookwhen Schedule directly in a Wordpress page. Requires a Bookwhen API key',

  category: 'common',

  icon: 'calendar',

  supports: {
    align: ['full', 'wide'],
    html: false,
  },

  attributes: {
    key: {
      type: 'string',
    },
  },

	edit: Edit,

	save,
});
