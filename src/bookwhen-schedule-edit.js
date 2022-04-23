import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor'
import { PanelBody, TextControl, ColorPalette } from '@wordpress/components'
import React, { useState } from "react";
import { useSelect } from '@wordpress/data';
import demoDom from './demoDom';

/**
 * Represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const { attributes, setAttributes, clientId } = props;

	// Store the blockID as an attribute to use as unique ID when styling multiple blocks
	setAttributes({
		blockId: clientId
	});

	// TODO use event here to hook into schedule.js - or better option via React?
	if(attributes.key){
		const bookwhenEdit = new Event('bookwhen-edit');
	}

	// Retrieve the themes color settings from the block editors' data
	const colors = useSelect('core/block-editor').getSettings().colors;
	const [_color, setColor] = useState(); // No default color set

	return (
		<>
			<div {...useBlockProps()}>
				{__('Bookwhen Schedule', 'bookwhen-schedule')}
				|{!attributes.key ? 'Please enter your Bookwhen API key' : demoDom(attributes.buttonBg, attributes.buttonColor) }
			</div>
			<InspectorControls>
				<PanelBody
					title="Options"
					initialOpen={ true }
				>
					<TextControl
						label={__("Bookwhen API Key", 'bookwhen')}
						value={attributes.key}
						onChange={ key => setAttributes({key})}
					/>
					<TextControl
						label={__("Tags (e.g. 'Bristol, Samba')", 'bookwhen')}
						value={attributes.filterTags}
						onChange={ filterTags => setAttributes({filterTags})}
					/>
				</PanelBody>
				<PanelBody title="Buttons" initialOpen={ true }>
					<fieldset>
						<legend className="blocks-base-control__label">
								{ __( 'Background', 'bookwhen' ) }
						</legend>

						<ColorPalette
							colors={colors}
							value={attributes.buttonBg}
							onChange={(buttonBg) => {setColor(buttonBg); setAttributes({buttonBg})}}
						/>
					</fieldset>
					<fieldset>
						<legend>
								{ __( 'Text', 'bookwhen' ) }
						</legend>

						<ColorPalette
							colors={colors}
							value={attributes.buttonColor}
							onChange={(buttonColor) => {setColor(buttonColor); setAttributes({buttonColor})}}
						/>
					</fieldset>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
