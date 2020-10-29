function HTTPValidator(http){
    let methods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    let regexURI = /^([A-Za-z0-9.])+$|\*/gm; // syntax for how to declare Regex in JS => must remember (/ => instead of ' how do i escape it)
    let possibleVersions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];
    let regexMessage = /^[^<>\\&'"]+$/gi;

    if (!methods.some(x => x == http.method) || !http.hasOwnProperty('method')) {
        throw new Error('Invalid request header: Invalid Method');
    }

    if (!http.uri.match(regexURI) || !http.hasOwnProperty('uri')) {
        throw new Error('Invalid request header: Invalid URI');
    }

    if (!possibleVersions.some(x => x == http.version) || !http.hasOwnProperty('version')) {
        throw new Error('Invalid request header: Invalid Version');
    }

    if (!http.message.match(regexMessage) || !http.hasOwnProperty('message')) {
        throw new Error('Invalid request header: Invalid Message');
    }
}

HTTPValidator({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ' '
});