const inputSlider = document.querySelector("#slider");
const datalength = document.querySelector("[data-lengthNumber]");
const copyMsg = document.querySelector("[data-copyMsg]");
const passDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const upper = document.querySelector("#Uppercase");
const lower = document.querySelector("#lowercase");
const symbol = document.querySelector("#symbol");
const number = document.querySelector("#numbers");
const indicator = document.querySelector("#indicator");
const generateButton = document.querySelector("#generator");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~!@#$%^&*()_+`[]\\{}|;:<>,.?/';

let password = "";
let passLength = 10;
let checkCount = 0;
handleSlider();

// Set the length of the password
function handleSlider() {
    inputSlider.value = passLength;
    datalength.innerText = passLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumber() {
    return getRandomInt(0, 9);
}

function generateLowercase() {
    return String.fromCharCode(getRandomInt(97, 123));
}

function generateUppercase() {
    return String.fromCharCode(getRandomInt(65, 91));
}

function generateSymbol() { // Corrected function name
    const randNum = getRandomInt(0, symbols.length);
    return symbols.charAt(randNum);
}

function calculateStrength() { // Fixed function name to be called correctly
    let hasNum = false;
    let hasUpper = false;
    let hasLower = false;
    let hasSymbol = false;

    if (upper.checked) {
        hasUpper = true;
    }

    if (lower.checked) {
        hasLower = true;
    }

    if (numbers.checked) {
        hasNum = true;
    }

    if (symbol.checked) {
        hasSymbol = true;
    }

    if (hasUpper && hasLower && (hasNum || hasSymbol) && passLength >= 8) {
        setIndicator("#ff0000");
    } else if ((hasLower || hasUpper) && (hasNum || hasSymbol) && passLength >= 6) {
        setIndicator("#FFA500");
    } else {
        setIndicator("#0000FF");
    }
}

async function copyMessage() {
    try {
        await navigator.clipboard.writeText(passDisplay.value);
        copyMsg.innerText = "Copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }

    setTimeout(() => {
        copyMsg.innerText = ""; // Clear the message after 2 seconds
    }, 2000);
}

function handleCheckBoxChange() {
    checkCount = 0;
    allcheckbox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    // Special condition
    if (passLength < checkCount) {
        passLength = checkCount;
        handleSlider();
    }

    calculateStrength(); // Call strength calculation here
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
});

inputSlider.addEventListener('input', (e) => {
    passLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click', (e) => {
    if (passDisplay.value) {
        copyMessage();
    }
});

generateButton.addEventListener('click', (e) => {
    console.log('Generate button clicked'); // Debugging line
    if (passLength < 1 || checkCount === 0) {
        console.log('Please select at least one character type and set password length.');
        return;
    }

    if (passLength < checkCount) {
        passLength = checkCount;
        handleSlider();
    } else {
        // Remove old password
        password = "";

        // Let us check and put the stuff mentioned by checkbox 
        let funcArray = []; // Corrected variable name

        if (upper.checked) {
            funcArray.push(generateUppercase);
        }

        if (lower.checked) {
            funcArray.push(generateLowercase);
        }

        if (numbers.checked) {
            funcArray.push(getRandomNumber);
        }

        if (symbol.checked) {
            funcArray.push(generateSymbol); // Corrected function name
        }

        // Compulsory addition of password
        for (let i = 0; i < funcArray.length; i++) {
            password += funcArray[i]();
        }

        // Remaining addition
        for (let i = 0; i < passLength - funcArray.length; i++) {
            let randomIndex = getRandomInt(0, funcArray.length);
            password += funcArray[randomIndex]();
        }
    }

    password = shufflePassword(Array.from(password));

    // Show in UI
    passDisplay.value = password;

    // Call calculate password strength function
    calculateStrength();
});


function shufflePassword(array) {
    // Fisher-Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array.join(''); // Simplified joining
}
