export function cleanHeaders(
 headers = {}
) {

    for( const name in headers ) {

        if( ! headers[ name ] )
            delete this.headers[ name ];

    }
    return headers;

}
