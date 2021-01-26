/* CHEERIO LIBRARY - FOR ADVANCED TESTING PURPOSE */
// External
import cheerio from 'cheerio';

// Cheerio
const $ = cheerio.load(
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
    , link = [
        {
            src: '#',
            rel: 'preload',
            as: 'script',
            position: 'phead',
        },
    ]
;

script.length && script.forEach(
    item => transformToHtml(
        item,
    )
);

link.length && link.forEach(
    item => transformToHtml(
        item,
        false
    )
);

const html = console.info(
    $.html()
);

console.info(
    html
);

return html;
