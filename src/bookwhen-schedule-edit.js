/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, TextControl } from '@wordpress/components'

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';
import demoDom from './demoDom';

/**
 * Represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes } = props;

	// TODO use event here to hook into schedule.js - or better option via React?
	if(attributes.key){
		const bookwhenEdit = new Event('bookwhen-edit');
	}

	return (
		<>
			<div {...useBlockProps()}>
				{__('Bookwhen Schedule', 'bookwhen-schedule')}
				|{!attributes.key ? 'Please enter your Bookwhen API key' : demoDom() }
			</div>
			<InspectorControls>
				<PanelBody
					title="Events Options"
					initialOpen={ true }
				>
					<TextControl
						label={__("Bookwhen API Key", 'bookwhen')}
						value={attributes.key}
						onChange={ key => setAttributes({key})}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
