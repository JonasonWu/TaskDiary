

//Generate random integers 
//start and end are the range of the numbers
//count is the number of integers to generate
//An array with the integers is returned
function generateNumbers(start, end, count) {
    const array = [];
    for (let i = 0; i < count; i++) {
        array.push(Math.ceil(Math.random()*(end-start))+start);
    }
    return array;
}

//This is a more complicated algorithm of generating numbers
//  May be harder to guess than the other original one.
function generateUpDown(start, end, count) {

}

//This is a more complicated algorithm of generating numbers
//  May be harder to guess than the other original one.
function generateAscending(start, end, count) {

}

//This is a more complicated algorithm of generating numbers
//  May be harder to guess than the other original one.
function generateDescending(start, end, count) {

}
module.exports = {
    generateNumbers,
    generateUpDown,
    generateAscending,
    generateDescending,
};