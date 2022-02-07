<?php
/**
 * Plugin Name:       Lastest Posts Block
 * Description:       Lastest Posts
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Albert Czarnecki
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dachtom
 *
 * @package           dachtom
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function render_dachtom_lastest_posts_block( ) {
	$args = array(
		'posts_per_page'   => 6,
		'post_status'      => 'publish',
		'suppress_filters' => false,
	);

	$recent_posts = get_posts( $args );
	$items = '';

	foreach ( $recent_posts as $post ) {
		$post_link = esc_url( get_permalink( $post ) );
		$title     = get_the_title( $post );
		$result = '';

		$featured_image = get_the_post_thumbnail_url(
			$post
		);

		$items .= 	'<a class="wp-block-dachtom-lastest-posts-block-item" href="'. $post_link . '">' .
						'<h2 class="wp-block-dachtom-lastest-posts-block-link">'. $title .'</h2>' .
						'<div class="wp-block-dachtom-lastest-posts-block-image">' .
							'<div class="wp-block-dachtom-lastest-posts-block-picture" style="background-image: url(' . $featured_image . ')"></div>' .
							'<div class="wp-block-dachtom-lastest-posts-block-overlay"></div>' .
						'</div>' .
					'</a>';
	}

	return sprintf(
		'<div class="wp-block-dachtom-lastest-posts-block-container">%1$s</div>',
		$items
	);
}

function dachtom_lastest_posts_block_init() {
	register_block_type_from_metadata( __DIR__ . '/build', array(
		'render_callback' => 'render_dachtom_lastest_posts_block'
	) );
}
add_action( 'init', 'dachtom_lastest_posts_block_init' );
