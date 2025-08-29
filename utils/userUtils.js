/**
 * User Utilities for BFHL API
 * Handles user ID generation and other user-related functions
 */

/**
 * Generates a user ID in the required format: {full_name_ddmmyyyy}
 * @returns {string} - Generated user ID
 */
function generateUserId() {
  // You can customize this function to generate different user IDs
  // For now, using a default format as per requirements
  
  const fullName = "john_doe"; // You can modify this
  const currentDate = new Date();
  
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  
  return `${fullName}_${day}${month}${year}`;
}

/**
 * Generates a user ID with custom name
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @returns {string} - Generated user ID
 */
function generateCustomUserId(firstName, lastName) {
  const fullName = `${firstName}_${lastName}`.toLowerCase().replace(/\s+/g, '_');
  const currentDate = new Date();
  
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();
  
  return `${fullName}_${day}${month}${year}`;
}

/**
 * Generates a user ID with a specific date
 * @param {string} fullName - Full name
 * @param {Date} date - Specific date
 * @returns {string} - Generated user ID
 */
function generateUserIdWithDate(fullName, date) {
  const normalizedName = fullName.toLowerCase().replace(/\s+/g, '_').replace(/^_+|_+$/g, '');
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${normalizedName}_${day}${month}${year}`;
}

/**
 * Validates user ID format
 * @param {string} userId - User ID to validate
 * @returns {boolean} - True if valid format
 */
function validateUserIdFormat(userId) {
  if (typeof userId !== 'string') return false;
  
  // Pattern: lowercase_name_ddmmyyyy
  const pattern = /^[a-z_]+_\d{8}$/;
  return pattern.test(userId);
}

/**
 * Extracts date from user ID
 * @param {string} userId - User ID to extract date from
 * @returns {Date|null} - Extracted date or null if invalid
 */
function extractDateFromUserId(userId) {
  if (!validateUserIdFormat(userId)) return null;
  
  try {
    const datePart = userId.split('_').pop();
    const day = parseInt(datePart.substring(0, 2));
    const month = parseInt(datePart.substring(2, 4)) - 1; // Month is 0-indexed
    const year = parseInt(datePart.substring(4, 8));
    
    return new Date(year, month, day);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateUserId,
  generateCustomUserId,
  generateUserIdWithDate,
  validateUserIdFormat,
  extractDateFromUserId
};
