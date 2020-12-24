function cleanHeaders(
 headers = {}
) {

    if( headers && typeof headers === 'object' ) {

    for( const name in headers ) {

            if( name && ! headers[ name ] )
                delete headers[ name ];

        }

}
    return headers;

}

export function setHeaders(
 res, headers
) {

    const cleanedHeaders = cleanHeaders(
 headers
);

    if( cleanedHeaders && Object.keys(
 cleanedHeaders
).length ) {

for( const name in cleanedHeaders ) {

res.setHeader(
 name,
headers[ name ]
);

}

}

}
