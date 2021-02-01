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

/*
*   * Exports
*/
export { queryParametersChecker };
