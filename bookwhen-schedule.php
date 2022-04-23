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
 * @package           bookwhen
 */

function schedule_block_init() {
	register_block_type( __DIR__, [
    'attributes' => [
      'blockId' => [
        'type' => 'string',
			],
			'key' => [
        'type' => 'string',
			],
      'filterTags' => [
        'type' => 'string',
			],
      'buttonBg' => [
        'type' => 'string',
			],
      'buttonColor' => [
        'type' => 'string',
			],
    ]
  ]);
}
add_action( 'init', 'schedule_block_init' );

function bookwhen_schedule_block_assets() {

	wp_enqueue_script(
		'bookwhen-schedule-script',
			plugins_url( '/assets/schedule.js', __FILE__ )
	);

	// Enqueue block editor styles
	wp_enqueue_style(
			'bookwhen-schedule-styles',
			plugins_url( '/assets/schedule.css', __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . '/assets/schedule.css' )
	);
}

add_action( 'enqueue_block_assets', 'bookwhen_schedule_block_assets' );