let assert = require('chai').assert;
let app = require('./EvenOrOdd');

describe('EvenOrOdd', () => {
    it('should return undefined when param is different than string', () => {
        assert.equal(undefined, app.isOddOrEven(5));
    });

    it('should return undefined when param is different than string v.2', () => {
        assert.equal(undefined, app.isOddOrEven([]));
    });

    it('should return undefined when param is different than string v.3', () => {
        assert.equal(undefined, app.isOddOrEven({}));
    });

    it('should return even when param.length is even', () => {
        assert.equal('even', app.isOddOrEven('more'));
    });

    it('should return odd when param.length is odd', () => {
        assert.equal('odd', app.isOddOrEven('car'));
    });
})