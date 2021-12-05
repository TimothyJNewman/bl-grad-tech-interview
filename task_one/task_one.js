// common passwords are read and stored in an array
let commonPwds = [
  "password",
  "12345",
  "qwerty"
]

// all check functions return the num of char to change
const checkNumChar = (testString) => {
  if (testString.length < 7) {
    return 7 - testString.length;
  }
  if (testString.length > 25) {
    return testString.length - 25;
  }
  return 0;
}

// limitation: only works for English language
const checkLowerUpperDigit = (testString) => {
  let lowerPresent = 0, upperPresent = 0, digitPresent = 0;
  // checks each char in string if lower, upper and digit is present
  for (let i = 0; i < testString.length; i++) {
    const unicodeVal = testString.charCodeAt(i);
    if (unicodeVal >= 97 && unicodeVal <= 122) {
      lowerPresent = 1;
    }
    if (unicodeVal >= 65 && unicodeVal <= 90) {
      upperPresent = 1;
    }
    if (unicodeVal >= 48 && unicodeVal <= 57) {
      digitPresent = 1;
    }
    // terminate loop if test already passed
    if (upperPresent && lowerPresent && digitPresent == true) {
      break;
    }
  }
  return 3 - lowerPresent - upperPresent - digitPresent;
}

const checkThriceRepeatedChar = (testString) => {
  let counter = 1;
  let charToChange = 0;
  let prevElem = testString[0];
  for (let i = 1; i < testString.length; i++) {
    if (testString[i] == prevElem) {
      counter++;
      if (counter >= 3) {
        charToChange++;
      }
    } else {
      counter = 1;
      prevElem = testString[i];
    }
  }
  return charToChange;
}

const checkNoCommonPwds = (testString) => {
  if (commonPwds.includes(testString)) {
    return testString.length;
  }
  return 0;
}

const getNumOfChanges = (password) => {
  const results = [
    checkNumChar(password),
    checkLowerUpperDigit(password),
    checkThriceRepeatedChar(password),
    checkNoCommonPwds(password)
  ]
  return Math.max(...results);
}

// testing below

// Test 1: Check if number of char is correct
console.log(getNumOfChanges("Supercalifragilisticexpialidocious")); // Expect: 9
console.log(getNumOfChanges("yP717"),"\n"); // Expect: 2

// Test 2: Check if lower, upper and digits are present
console.log(getNumOfChanges("supercali")); // Expect: 2
console.log(getNumOfChanges("SUPERCALI")); // Expect: 2
console.log(getNumOfChanges("65765765889")); // Expect: 2
console.log(getNumOfChanges("superc889"),"\n"); // Expect: 1

// Test 3: Check if char repeated 3 or more times
console.log(getNumOfChanges("superccc")); // Expect: 2, Upper and digits missing but only 1 char to be changed to pass checkThriceRepeatedChar
console.log(getNumOfChanges("ssssuper")); // Expect: 2
console.log(getNumOfChanges("superrrrrrcalifff"),"\n"); // Expect: 5

// Test 4: Check not common password
console.log(getNumOfChanges("password")); // Expect: 8

// Test 5: Check examples with multiple failures
console.log(getNumOfChanges("1111111111111111111"),"\n"); // Expect: 17

// Test 6: Now test yourself!
const password = "";
console.log(getNumOfChanges(password));