var expect = require('chai').expect;
var blender = require('../index');

describe('just your average blender tests', function() {
    it('always returns a full request url', function() {
        expect(blender('http://a.b', 'http://c.d')).to.equal('http://a.b/');
        expect(blender('http://a.b', 'http://c.d/test')).to.equal('http://a.b/');
        expect(blender('http://a.b', 'http://c.d/test?query=true')).to.equal('http://a.b/');
        expect(blender('http://a.b', 'http://c.d/test#hash')).to.equal('http://a.b/');
    });

    it('always returns a full request url when a full request url is sent', function() {
        expect(blender('http://a.b')).to.equal('http://a.b/');
        expect(blender('http://a.b', 'http://c.d')).to.equal('http://a.b/');
        expect(blender('http://a.b', 'http://c.d/test')).to.equal('http://a.b/');
        expect(blender('http://a.b', 'http://c.d/test?query=true')).to.equal('http://a.b/');
        expect(blender('http://a.b', 'http://c.d/test#hash')).to.equal('http://a.b/');
    });

    it('always returns a context url up to the pathname when the request url is empty', function() {
        expect(blender('', 'http://c.d')).to.equal('http://c.d/');
        expect(blender('', 'http://c.d/test')).to.equal('http://c.d/test');
        expect(blender('', 'http://c.d/test?query=true')).to.equal('http://c.d/test');
        expect(blender('', 'http://c.d/test#hash')).to.equal('http://c.d/test');
    });

    it('always returns a partial url when two partial urls are provided', function() {
        expect(blender('api', '')).to.equal('api');
        expect(blender('api', 'test')).to.equal('test/api');
        expect(blender('api', '/test')).to.equal('/test/api');
        expect(blender('../api', 'test')).to.equal('api');
    });

    it('always returns the expected relative path', function() {
        expect(blender('/api', 'http://c.d')).to.equal('http://c.d/api');
        expect(blender('api', 'http://c.d')).to.equal('http://c.d/api');
        expect(blender('./api', 'http://c.d')).to.equal('http://c.d/api');
        expect(blender('../api', 'http://c.d')).to.equal('http://c.d/api');

        expect(blender('/api', 'http://c.d/test')).to.equal('http://c.d/api');
        expect(blender('api', 'http://c.d/test')).to.equal('http://c.d/test/api');
        expect(blender('./api', 'http://c.d/test')).to.equal('http://c.d/test/api');
        expect(blender('../api', 'http://c.d/test')).to.equal('http://c.d/api');

        expect(blender('/api', 'http://c.d/test/status')).to.equal('http://c.d/api');
        expect(blender('api', 'http://c.d/test/status')).to.equal('http://c.d/test/status/api');
        expect(blender('./api', 'http://c.d/test/status')).to.equal('http://c.d/test/status/api');
        expect(blender('../api', 'http://c.d/test/status')).to.equal('http://c.d/test/api');
    });

    it('always use the query parameters and hash from the relative path', function() {
        expect(blender('api?name=blender', 'http://c.d?x#y')).to.equal('http://c.d/api?name=blender');
        expect(blender('api#blender', 'http://c.d?x#y')).to.equal('http://c.d/api#blender');
        expect(blender('api?name=blender#blender', 'http://c.d?x#y')).to.equal('http://c.d/api?name=blender#blender');
    });

    it('always use the username and host from the context domain', function() {
        expect(blender('api', 'http://user:pwd@c.d')).to.equal('http://user:pwd@c.d/api');
        expect(blender('http://a.b', 'http://user:pwd@c.d')).to.equal('http://a.b/');
    });

    it('always fail gracefully', function() {
        expect(blender(undefined, undefined)).to.equal('');
        expect(blender(undefined, '')).to.equal('');
        expect(blender('', undefined)).to.equal('');
        expect(blender('', '')).to.equal('');
        expect(blender(true, false)).to.equal('');
        expect(blender(' ', null)).to.equal('');
        expect(blender(123, {})).to.equal('');
        expect(blender([], function() {})).to.equal('');
    });
});