/*
https://nodejs.org/docs/latest/api/url.html#url_url_strings_and_url_objects
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
│   origin    │                     │       origin        │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
*/
const url = require('url');
const path = require('path');

module.exports = (request, context) => {
    const rurl = url.parse(typeof request === 'string' ? request : '');
    const curl = url.parse(typeof context === 'string' ? context : '');

    const parts = [];

    if (rurl.protocol) {
        parts.push(rurl.protocol);
        parts.push('//');
    } else if (curl.protocol) {
        parts.push(curl.protocol);
        parts.push('//');
    }

    if (rurl.host) {
        parts.push(rurl.host);
    } else if (curl.host) {
        if (curl.auth) {
            parts.push(curl.auth);
            parts.push('@');
        }
        parts.push(curl.host);
    }

    if (rurl.pathname) {
        parts.push(
            url.resolve(
                path.normalize(
                    rurl.pathname[0] === '/' ?
                    rurl.pathname :
                    path.join(curl.pathname || '', rurl.pathname)
                ), ''
            )
        );
    } else if (curl.pathname) {
        parts.push(url.resolve(curl.pathname, ''));
    }

    if (rurl.search) {
        parts.push(rurl.search);
    }

    if (rurl.hash) {
        parts.push(rurl.hash);
    }

    return parts.join('');
}