/* eslint-disable no-use-before-define */

//Generate random integers 
//start and end are the range of the numbers
//count is the number of integers to generate
//An array with the integers is returned
function generateNumbers(start, end, count) {
    const array = [];
    for (let i = 0; i < count; i++) {
        array.push(Math.ceil(Math.random()*(end-start)));
    }
    return array.map(e => e+start);
}

//This is a more complicated algorithm of generating numbers
//  May be harder to guess than the other original one.
function generateAscending(start, end, count) {
    const array = generateNumbers(start, end, count);
    return array.sort((a, b) => a - b);
}

//This is a more complicated algorithm of generating numbers
//  May be harder to guess than the other original one.
function generateDescending(start, end, count) {
    const array = generateNumbers(start, end, count);
    return array.sort((a, b) => b - a);
}

//This is a more complicated algorithm of generating numbers
//  May be harder to guess than the other original one.
function generateUpDown(start, end, count) {

    const ascending = generateAscending(start, Math.floor(end/2), Math.ceil(count/2));
    const descending = generateDescending(Math.floor(end/2), end, Math.floor(count/2));
    const array = [];
    descending.forEach((e, i) => {
        array.push(ascending[i]);
        array.push(e);
    });
    //If count is odd, then we still have to add the last element of ascending array
    if (count % 2 === 1) {
        array.push(ascending[ascending.length -1]);
    }
    return array;
}
//Returns a scrambeled array
function scramble (arr) {
    for (let i = 0; i < arr.length; i++) {
        const index1 = Math.floor(Math.random()*arr.length);
        const index2 = Math.floor(Math.random()*arr.length);

        const tmp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = tmp;
    }
    return arr;
}


function main() {
    const formBtn = document.querySelector('#form_memory input[type="submit"]');
    formBtn.addEventListener('click', handleFormSubmission);
    const restartBtn = document.querySelector('#restart input');
    restartBtn.addEventListener('click', handleRestart);
}

function handleFormSubmission(evt) {
    evt.preventDefault();
    const level = Number(document.querySelector('input[name="level"]').value);
    const type = document.querySelector('select[name="type"]').value;
    if (level > 30 || level < 1) {
        //Invalid user input, so make sure the error message is visible.
        document.getElementById('form_error').classList.remove('hide');
    }
    else {
        //Add the .hide css to hide the error statement if it exists, to prepare for a restart
        //  of the game.
        document.getElementById('form_error').classList.add('hide');
        //Add hide to the form to hide that as well.
        document.getElementById('form_memory').classList.add('hide');

        //Change the text content of the second header
        document.getElementById('memory_h2').textContent = "Remember these values";

        //We have valid inputs, so process the inputs and start the game.
        startGame(level, type);
    }    
}

function startGame(level, type) {
    let arr;
    switch(type) {
        case "random":
            arr = generateNumbers(1, 100, level);
            break;
        case "updown":
            arr = generateUpDown(1, 100, level);
            break;
        case "ascending":
            arr = generateAscending(1, 100, level);
            break;
        case "descending":
            arr = generateDescending(1, 100, level);
            break;
        default:
            console.log("Unknown input type for the form.");
    }
    const game = document.getElementById('memory_game');
    const location = document.createElement('div');
    location.setAttribute('id', "showArray");
    game.appendChild(location);

    //Display the array values on the screen at the location
    showArray(arr, location);
    //Give user level*1000 seconds to remember the numbers, then call removeArray
    //  to stop the display of the values and allow user interaction.
    setTimeout(removeArray.bind(this, arr, location), level*1000);
}

function showArray(arr, location) {
    arr.forEach(e => {
        const div = document.createElement('div');
        div.textContent = e;
        location.appendChild(div);
    });
}
function removeArray(arr, location) {
    while (location.hasChildNodes()) {
        location.removeChild(location.firstChild);
    }
    userPlay(arr);
}
function userPlay(arr) {
    //Change the text content of the second header
    document.getElementById('memory_h2').textContent = "What were the order of the values?";
    //Make a copy of the reversed array
    const cpy = [...arr].reverse();
    //Make a scrambeled version of the array
    const scrambledArr = scramble([...arr]);

    //Show the scrambeled version of the array to let the user click the ordering
    showArray(scrambledArr, document.getElementById('showArray'));
    //Add event listener for each div element
    const showLocation = document.querySelectorAll('#showArray div');
    //Record whether the game has eneded.
    let end = false;
    //Add event listener for each box.
    showLocation.forEach(e => {
        const checkAnswer = function(arr, cpy, e) {
            e.removeEventListener('click', checkAnswer);
            //If a win has already happened, no other operation should be done.
            if (end) {
                return;
            }
            if (cpy.pop() === Number(e.textContent)) {
                //Correct
                e.classList.add('backgroundGreen');
            }
            else {
                //Incorrect, so the player loses.
                e.classList.add('backgroundRed');
                end = true;
                ended("lost", arr, cpy);
            }
            //If all values have been guessed, return a win
            if (cpy.length === 0) {
                end = true;
                ended("win");
            }
        }.bind(this, arr, cpy, e);
        e.addEventListener('click', checkAnswer);
    });
}

function ended(status, arr=null) {
    if (status === "win") {
        //Change the text content of the second header
        document.getElementById('memory_h2').textContent = "You got all of them correctly. Congrats 😊!!";
        //Allow restart option
        document.querySelector('#restart input').classList.remove('hide');
    }
    else {

        //Change the text content of the second header
        document.getElementById('memory_h2').textContent = "You got it incorrectly.";
        
        const game = document.getElementById('memory_game');

        const text = document.createElement('div');
        text.textContent = "Below is the correct ordering";

        //Create div element for showing correct ordering
        const div = document.createElement('div');
        div.setAttribute('id', 'correctAnswer');
        showArray(arr, div);

        game.appendChild(text);
        game.appendChild(div);
    }
    //Allow restart option
    document.querySelector('#restart input').classList.remove('hide');
}
function handleRestart() {
    //Reset the paramters
    document.querySelector('#restart input').classList.add('hide');
    document.getElementById('memory_h2').textContent = "Select difficulty level and difficulty type";
    document.getElementById('form_memory').classList.remove('hide');
    const divs = document.querySelector('#memory_game');
    //Remove all elements of the memory_game
    while(divs.hasChildNodes()) {
        divs.removeChild(divs.firstChild);
    }
}

//document.addEventListener("DOMContentLoaded", main);

//This is for unit testing of the functions using mocha. Comment out the DOMContentLoaded to run.
module.exports = {
    generateNumbers,
    generateUpDown,
    generateAscending,
    generateDescending
};
