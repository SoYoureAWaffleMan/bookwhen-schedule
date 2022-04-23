# Bookwhen Schedule
Contributors:      The WordPress Contributors
Tags:              block
Tested up to:      5.8.0
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Bookwhen plugin for Wordpress. Provides a block that renders your Bookwhen schedule directly in a Wordpress page using the (Bookwhen API)[https://api.bookwhen.com/v2] rather than an iframe.

## Description

Once installed, a Bookwhen Schedule block is available in the Wordpress page editor. Add it to a page to see your schedule rendered. Customise using standard CSS if necessary.

Users on your site can click through to the booking page itself to complete payment.

## Installation

1. Upload the plugin files to the `/wp-content/plugins/bookwhen-schedule` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress
1. Add the block to a page and set its API key

## Development

1. Run `npm run start` in the root directory to enable "Live Reload"
1. Consider a symlink from e.g. `/var/www/movema/wp-content/plugins/bookwhen-schedule` -> `/myCode/bookwhen-schedule` to see edits take effect