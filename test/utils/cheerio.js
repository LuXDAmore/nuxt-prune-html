/* CHEERIO LIBRARY - FOR ADVANCED TESTING PURPOSE */
// External
import { load } from 'cheerio';

// Cheerio
const $ = load(
        '<html><head><meta /></head><body><div></div></body></html>'
    )
    // Transform to Cheerio
    , transformToHtml = (
        item,
        isScript = true
    ) => {

        let scriptOrLink = isScript
            ? '<script '
            : '<link '
        ;

        for( const key of Object.keys( item ) ) {

            key !== 'position' && item[ key ] && (
                scriptOrLink += `${ key }=${ item[ key ] } `
            );

        }

        scriptOrLink += isScript
            ? '></script>'
            : '/>'
        ;

        switch( item.position ) {
            case 'phead':
                $( 'head' ).prepend( scriptOrLink );
            break;
            case 'head':
                $( 'head' ).append( scriptOrLink );
            break;
            case 'pbody':
                $( 'body' ).prepend( scriptOrLink );
            break;
            case 'body':
            default:
                $( 'body' ).append( scriptOrLink );
        }

    }
    // Values
    , link = [
        {
            href: '#',
            rel: 'preload',
            as: 'script',
            position: 'phead',
        },
    ]
    , script = [
        {
            src: '#',
            position: 'head',
        },
        {
            src: '#',
            position: 'pbody',
        },
        {
            src: '#',
        },
    ]
;

link.length && link.forEach(
    item => transformToHtml(
        item,
        false
    )
);

script.length && script.forEach(
    item => transformToHtml(
        item,
    )
);

const html = $.html();

console.info(
    html
);

return html;
