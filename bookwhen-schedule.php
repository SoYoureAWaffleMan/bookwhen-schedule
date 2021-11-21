<?php
/**
 * Plugin Name:       Bookwhen Schedule
 * Description:       Bookwhen plugin for Wordpress. Provides a block that renders your Bookwhen schedule directly in a Wordpress page
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bookwhen-schedule
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function create_block_bookwhen_schedule_block_init() {
	register_block_type( __DIR__, [
    'attributes' => [
      'key' => [
        'type' => 'string',
      ]
    ]
  ]);
}
add_action( 'init', 'create_block_bookwhen_schedule_block_init' );
