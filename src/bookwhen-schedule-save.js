/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save (props) {
	const id = '_'+props.attributes.blockId.replaceAll('-', '')
	const key = props.attributes.key
	const filterTags = props.attributes.filterTags
	const buttonBg = props.attributes.buttonBg
	const buttonColor = props.attributes.buttonColor

	if(!key){
		return 'Please enter your Bookwhen API key'
	}

	// Push button styles to a mini <style> block on save rather than every button's inline style on render
	let style = [];
	buttonBg && style.push(`#${id}.wp-block-bookwhen-schedule a.action { background-color: ${buttonBg}!important }`);
	buttonColor && style.push(`#${id}.wp-block-bookwhen-schedule a.action { color: ${buttonColor}!important }`);

	return (
		<div
			{...useBlockProps.save()}
			id={id}
			class="bookwhen-schedule shell"
			data-api-key={key}
			data-filter-tags={filterTags}>
				<style dangerouslySetInnerHTML={{__html: style.join(';')}} />
			<div class="inner"></div>
		</div>
	);
}
