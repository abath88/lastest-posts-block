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
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { get, pickBy, isUndefined } from 'lodash';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import empty from '../assets/img/empty.jpeg';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	const open = useSelect(select => select('core/edit-post').isEditorSidebarOpened() )

	const { latestPosts } = useSelect( (select) => {
		const { getEntityRecords } = select( coreStore );
		const latestPostsQuery = pickBy(
			{
				_embed: 'wp:featuredmedia',
				per_page: 6,
			},
			( value ) => ! isUndefined( value )
		);
		
		return { 
			latestPosts: getEntityRecords(
				'postType',
				'post',
				latestPostsQuery
			) 
		}  
	})
	return (	
		<div {...useBlockProps()}>
			<div className={`wp-block-dachtom-lastest-posts-block-container ${open ? 'is-panel-open' : 'is-panel-close'}`}>
			{latestPosts && latestPosts.map( i => {
				const image = get( i, [ '_embedded', 'wp:featuredmedia', '0' ] );
				return (
					<div className="wp-block-dachtom-lastest-posts-block-item">
						<a className="wp-block-dachtom-lastest-posts-block-link" href={i.link}>    
							<h2>{i.title.rendered}</h2>   
						</a>
						<div className="wp-block-dachtom-lastest-posts-block-picture" style={{backgroundImage: `url('${image ? image.source_url : empty}')`}}>
							<div className="wp-block-dachtom-lastest-posts-block-overlay"></div>
						</div>
					</div>
				)
			})}
			</div>
		</div>
	);
}
