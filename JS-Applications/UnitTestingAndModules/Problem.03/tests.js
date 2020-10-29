let assert = require('chai').assert;
let app = require('./CharLookup');

describe('lookupChar', () => {
    it('should return undefined when first param is incorect', () => {
        assert.equal(undefined, app.lookupChar(5, 3));
    });

    it('should return undefined when second param is incorect', () => {
        assert.equal(undefined, app.lookupChar('valid', 'invalid'));
    })

    it('should return undefined if both params are incorect', () => {
        assert.equal(undefined, app.lookupChar(5, 'invalid'));
    })

    it('should retunt Incorrect index if first param.lenght is smaller than second param', () => {
        assert.equal('Incorrect index', app.lookupChar('valid', 5));
    })

    it('should return Incorrect index if second param is smaller than 0', () => {
        assert.equal('Incorrect index', app.lookupChar('valid', -1));
    });

    it('should return correct char from index', () => {
        let expected = 'i';
        let actual = app.lookupChar('valid', 3);
        assert.equal(actual, expected, 'The function did not return the expected value!'); 
                                        // warning message if the function does not return the exected value.
    });
});