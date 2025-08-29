/**
 * Data Processor Utility for BFHL API
 * Processes input array and returns categorized data according to requirements
 */

/**
 * Checks if a string represents a valid number
 * @param {string} str - String to check
 * @returns {boolean} - True if string is a valid number
 */
function isNumber(str) {
  if (typeof str !== 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str)) && isFinite(str);
}

/**
 * Checks if a string contains only alphabets
 * @param {string} str - String to check
 * @returns {boolean} - True if string contains only alphabets
 */
function isAlphabet(str) {
  if (typeof str !== 'string') return false;
  return /^[a-zA-Z]+$/.test(str);
}

/**
 * Checks if a string is a special character
 * @param {string} str - String to check
 * @returns {boolean} - True if string is a special character
 */
function isSpecialCharacter(str) {
  if (typeof str !== 'string') return false;
  return /^[^a-zA-Z0-9\s]+$/.test(str);
}

/**
 * Processes the input array and returns categorized data
 * @param {Array} data - Input array from request
 * @returns {Object} - Processed data with all required fields
 */
function processData(data) {
  try {
    if (!data || data.length === 0) {
      throw new Error('Data array cannot be empty');
    }

    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    let allAlphabets = '';

    // Process each element in the array
    data.forEach(item => {
      if (isNumber(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) {
          evenNumbers.push(item); // Keep as string as per requirements
        } else {
          oddNumbers.push(item); // Keep as string as per requirements
        }
        sum += num;
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase()); // Convert to uppercase
        allAlphabets += item; // Collect for concatenation
      } else if (isSpecialCharacter(item)) {
        specialCharacters.push(item);
      }
    });

    // Generate concatenated string with alternating caps in reverse order
    const concatString = generateAlternatingCapsString(allAlphabets);

    return {
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(), // Return sum as string as per requirements
      concat_string: concatString
    };

  } catch (error) {
    console.error('Error processing data:', error);
    throw new Error('Failed to process input data');
  }
}

/**
 * Generates a string with alternating caps in reverse order
 * @param {string} str - Input string
 * @returns {string} - String with alternating caps in reverse order
 */
function generateAlternatingCapsString(str) {
  if (!str || str.length === 0) return '';
  
  // Reverse the string and convert to alternating caps
  const reversed = str.split('').reverse().join('');
  let result = '';
  
  for (let i = 0; i < reversed.length; i++) {
    if (i % 2 === 0) {
      result += reversed[i].toUpperCase();
    } else {
      result += reversed[i].toLowerCase();
    }
  }
  
  return result;
}

/**
 * Validates input data structure
 * @param {Array} data - Input array to validate
 * @returns {boolean} - True if valid
 */
function validateInput(data) {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return false;
  
  // Check if all elements are strings
  return data.every(item => typeof item === 'string');
}

module.exports = {
  processData,
  isNumber,
  isAlphabet,
  isSpecialCharacter,
  validateInput,
  generateAlternatingCapsString
};
