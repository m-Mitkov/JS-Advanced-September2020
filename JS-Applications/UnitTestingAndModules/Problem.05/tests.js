let assert = require('chai').assert;
let StringBuilder = require('./StringBuilder');

describe('StringBuilder', () => {
    let sb;
    beforeEach(() => {
        sb = new StringBuilder();
    });

    describe('verfyParam', () => {
        it('should throw Error when input param is incorect', () => {
            assert.throw(() => {
                new StringBuilder({});
            }, 'Argument must be string');
        });
    })

    describe('constructor', () => {
        it('should instantiate the object correctly when passed param is != undefined', () => {
            let sb = new StringBuilder('input');
            let expected = 'input';

            assert.equal(expected, sb.toString());
        });

        it('should instantiate the object correctly when passed param is == undefined', () => {
            let expected = sb.toString();

            assert.equal('', sb.toString());
        });
    });

    describe('append', () => {
        it('should append input param to the end of the instance of StringBuilder', () => {
            sb.append('work');
            assert.equal('work', sb.toString());

        });
    });

    describe('prepend', () => {
        it('should prepend input param to the begining of the instance of StringBuilder', () => {
            sb.append('param');
            sb.prepend('work');
            assert.equal('work' + 'param', sb.toString());

        });
    });

    describe('insertAt', () => {
        it('should insert input param at correct index', () => {
            sb.append('ork');
            sb.insertAt('w', 0);
            assert.equal('work', sb.toString());
        });
    });

    describe('remove', () => {
        it('should remove remove from start index count times', () => {
            sb.append('Hello world!asd'); // index 12 => count 3
            sb.remove(12, 3);
            assert.equal('Hello world!', sb.toString());
        });
    });

    describe('toString', () => {
        it('should return the correct text from the StringBuilder', () => {
            sb.append('work');
            let expected = 'work';
            assert.equal(expected, sb.toString());
        })
    })
});