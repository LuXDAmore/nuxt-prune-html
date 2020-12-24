export function setHeaders(
 res, headers = {}
) {

for( const name in headers ) {

    if( ! headers[ name ] )
        delete headers[ name ];
    else {

res.setHeader(
 name,
headers[ name ]
);

}

}

}

