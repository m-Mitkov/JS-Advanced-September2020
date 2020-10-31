let assert = require('chai').assert;
let expect = require('chai').expect;
let PaymentPackage = require('./PaymentPackage');

describe('PaymentPackage', () => {
    let app;
    beforeEach(() =>{
        app = new PaymentPackage('name', 7);
    });

    describe('constructor', () => {
        it('should set the propertie name correctly', () => {
            expect(app.name).to.be.an('string').to.equal('name');
        });

        it('should set the propertie value correctly', () => {
            expect(app.value).to.be.an('number').to.equal(7);
        });

        it('should set VAT by default to 20', () => {
            expect(app.VAT).to.equal(20);
        });

        it('should set active by default to true', () => {
            expect(app.active).to.equal(true);
        });
    });

    describe('get/set name', () => {
        it('get name should return the correct value', () => {
            assert.equal('name', app.name);
        });

        it('set name should throw exception when new name !== string', () => {
            assert.throw(() => {
                app.name = 123;
            }, 'Name must be a non-empty string');
        });

        it('set name should throw exception when new name.length == 0', () => {
            assert.throw(() => {
                app.name = '';
            }, 'Name must be a non-empty string');
        });

        it('set name should return the correct value', () => {
           let newName = 'newName';
           app.name = newName;
           assert.equal(newName, app.name);
        });

    });

    describe('get/set value', () => {
        it('get value should return the correct value', () => {
            assert.equal(7, app.value);
        });

        it('set value should throw exception when new value !== number', () => {
            assert.throw(() => {
                app.value = 'invalid';
            }, 'Value must be a non-negative number');
        });

        it('set value should throw exception when new value < 0', () => {
            assert.throw(() => {
                app.value = -5;
            }, 'Value must be a non-negative number');
        });

        it('set value should return the correct value', () => {
           let newValue =  9;
           app.value = newValue;
           assert.equal(newValue, app.value);
        });
    });

    describe('get/set VAT', () => {
        it('get VAT should return the correct VAT', () => {
            assert.equal(20, app.VAT); // by default 20
        });

        it('set VAT should throw exception when new VAT !== number', () => {
            assert.throw(() => {
                app.VAT = 'invalid';
            }, 'VAT must be a non-negative number');
        });

        it('set VAT should throw exception when new VAT < 0', () => {
            assert.throw(() => {
                app.VAT = -7;
            }, 'VAT must be a non-negative number');
        });

        it('set VAT should return the correct VAT', () => {
           let newVAT =  9;
           app.VAT = newVAT;
           assert.equal(newVAT, app.VAT);
        });
    });

    describe('get/set active', () => {
        it('get active should return the correct value', () => {
            assert.equal(true, app.active); // by default true
        });

        it('set active should throw exception when new active !== boolean', () => {
            assert.throw(() => {
                app.active = 'invalid';
            }, 'Active status must be a boolean');
        });

        it('set active should return the correct active', () => {
           let newactive =  false;
           app.active = newactive;
           assert.equal(newactive, app.active);
        });
    });

    describe('toString method', () => {
        it('should return the correct information', () =>{
            let result = '';
            result += `Package: ${app.name}` + (app.active === false ? ' (inactive)' : '');
            result += '\n';
            result += `- Value (excl. VAT): ${app.value}`;
            result += '\n';
            result += `- Value (VAT ${app.VAT}%): ${app.value * (1 + app.VAT / 100)}`;
               
            assert.equal(result, app.toString());
        });
    });
});