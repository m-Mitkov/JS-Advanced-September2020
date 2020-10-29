let assert = require('chai').assert;
let app = require('./MathEnforcer');

describe('mathEnforcer', () => {

    describe('addFive', () => {
        it('should return undifined if param is NaN', () => {
            assert.equal(undefined, app.addFive('asd'));
        });

        it('should addFive to the input param', () => {
            let actual = app.addFive(5);
            let expected = 10;
            assert.equal(expected, actual);
        });
    });

    describe('subtractTen', () => {
        it('should return undifined if param is NaN', () => {
            assert.equal(undefined, app.subtractTen('asd'));
        });

        it('should subtract ten from the input param', () => {
            let actual = app.subtractTen(15);
            let expected = 5;
            assert.equal(expected, actual);
        })
    })

    describe('sum', () => {
        it('should return undifined if first param is NaN', () => {
            assert.equal(undefined, app.sum('asd', 5));
        });

        it('should return undifined if second param is NaN', () => {
            assert.equal(undefined, app.sum(5, 'asd'));
        });

        it('should return undifined if both params are NaN', () => {
            assert.equal(undefined, app.sum('asd', 'asd'));
        });

        it('should return the correct sum of the params', () => {
            let expected = 20;
            let actual = app.sum(5, 15);
            assert.equal(expected, actual);     
        });
    });
});