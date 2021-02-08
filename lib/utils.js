/*
*   * Methods
*/
function stringToArray( v ) {

    if( ! v )
        return [];

    /*
    *   * Allowed strings concatenated by spaces
    */
    return typeof v === 'string'
        ? v.split( ' ' )
        : v
    ;

}

function scriptOrLinkToHtml( $cheerio, item, isScript = true ) {

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
            $cheerio( 'head' ).prepend( scriptOrLink );
        break;
        case 'head':
            $cheerio( 'head' ).append( scriptOrLink );
        break;
        case 'pbody':
            $cheerio( 'body' ).prepend( scriptOrLink );
        break;
        case 'body':
        default:
            $cheerio( 'body' ).append( scriptOrLink );
    }

}

/*
*   * Exports
*/
export {
    stringToArray,
    scriptOrLinkToHtml,
};
