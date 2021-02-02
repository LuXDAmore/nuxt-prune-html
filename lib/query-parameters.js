/*
*   * Node
*/
import { URLSearchParams } from 'url';

/*
*   * Method
*/
function queryParametersChecker(
    query,
    parameters = []
) {

    const url = new URLSearchParams( query );

    return ( parameters || [] ).some( ( { key, value } ) => url.get( key ) === value );

}

function acceptQueryParameters(
    query,
    arrayToPrune,
    arrayToExclude,
) {

    return !! (
        query
        && (
            ( arrayToPrune && arrayToPrune.length )
            || ( arrayToExclude && arrayToExclude.length )
        )
    );

}

/*
*   * Exports
*/
export {
    queryParametersChecker,
    acceptQueryParameters,
};
