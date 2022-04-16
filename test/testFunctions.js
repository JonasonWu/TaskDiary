const path = require('path');
const chai = require('chai');
const expect = chai.expect; 
const modulePath = path.join(__dirname, '../MemoryGame/memoryFunctions.js');
const funcs = require(modulePath);

describe('memoryFunctions', function() {
    describe('generateNumbers', function() {
        it('should return an array of random integers within the range indicated', function() {
            const arr = funcs.generateNumbers(40, 100, 50);
            for (let i = 0; i < 50; i++) {
                expect(arr[i]).to.be.a('number');
                expect(arr[i] % 1).to.equal(0);
                chai.assert.isAtLeast(arr[i], 40);
                chai.assert.isAtMost(arr[i], 100);
            }
        });
    });
    describe('generateUpDown', function() {
        it('should generate an array of random integers within the range indicated', function() {
            const arr = funcs.generateUpDown(40, 100, 50);
            for (let i = 0; i < 50; i++) {
                expect(arr[i]).to.be.a('number');
                expect(arr[i] % 1).to.equal(0);
                chai.assert.isAtLeast(arr[i], 40);
                chai.assert.isAtMost(arr[i], 100);
            }
        });
        it('The first element should be less than or equal to the second element.', function() {
            const arr = funcs.generateUpDown(0, 100, 50);
            chai.assert.isAtMost(arr[0], arr[1]);
        });
        it('The second element should be greater than or equal the third element.', function() {
            const arr = funcs.generateUpDown(0, 100, 50);
            chai.assert.isAtLeast(arr[1], arr[2]);
        });
        it('There should be a consistent fluxuations of the numbers in the array.', function() {
            const arr = funcs.generateUpDown(0, 100, 50);
            for (let i = 0; i < arr.length-1; i++) {
                if (i % 2 === 0) {
                    //even index
                    chai.assert.isAtMost(arr[i], arr[i+1]);
                }
                else {
                    //odd index
                    chai.assert.isAtLeast(arr[i], arr[i+1]);
                }
            }
        });
    });
    describe('generateAscending', function() {
        it('should generate an array of random integers within the range indicated', function() {
            const arr = funcs.generateAscending(40, 100, 50);
            for (let i = 0; i < 50; i++) {
                expect(arr[i]).to.be.a('number');
                expect(arr[i] % 1).to.equal(0);
                chai.assert.isAtLeast(arr[i], 40);
                chai.assert.isAtMost(arr[i], 100);
            }
        });
        it('should consistently generate larger or equal numbers', function() {
            const arr = funcs.generateAscending(0, 100, 50);
            for (let i = 0; i < arr.length-1; i++) {
                chai.assert.isAtMost(arr[i], arr[i+1]);
            }
        });
    });
    describe('generateDescending', function() {
        it('should generate an array of random integers within the range indicated', function() {
            const arr = funcs.generateDescending(40, 100, 50);
            for (let i = 0; i < 50; i++) {
                expect(arr[i]).to.be.a('number');
                expect(arr[i] % 1).to.equal(0);
                chai.assert.isAtLeast(arr[i], 40);
                chai.assert.isAtMost(arr[i], 100);
            }
        });
        it('should consistently generate smaller or equal numbers', function() {
            const arr = funcs.generateDescending(0, 100, 50);
            for (let i = 0; i < 50; i++) {
                chai.assert.isAtLeast(arr[i], arr[i+1]);
            }
        });

    });

});

