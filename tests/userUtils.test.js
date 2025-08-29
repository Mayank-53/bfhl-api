const { 
  generateUserId, 
  generateCustomUserId, 
  generateUserIdWithDate, 
  validateUserIdFormat, 
  extractDateFromUserId 
} = require('../utils/userUtils');

describe('User Utils Tests', () => {
  
  describe('generateUserId function', () => {
    test('should generate user ID with current date', () => {
      const userId = generateUserId();
      
      expect(typeof userId).toBe('string');
      expect(userId).toMatch(/^john_doe_\d{8}$/);
      
      // Extract date and verify it's today
      const datePart = userId.split('_').pop();
      const day = parseInt(datePart.substring(0, 2));
      const month = parseInt(datePart.substring(2, 4));
      const year = parseInt(datePart.substring(4, 8));
      
      const today = new Date();
      expect(day).toBe(today.getDate());
      expect(month).toBe(today.getMonth() + 1);
      expect(year).toBe(today.getFullYear());
    });
  });

  describe('generateCustomUserId function', () => {
    test('should generate user ID with custom name', () => {
      const userId = generateCustomUserId('John', 'Doe');
      
      expect(typeof userId).toBe('string');
      expect(userId).toMatch(/^john_doe_\d{8}$/);
      expect(userId).toContain('john_doe');
    });

    test('should handle names with spaces', () => {
      const userId = generateCustomUserId('Mary Jane', 'Smith');
      
      expect(typeof userId).toBe('string');
      expect(userId).toMatch(/^mary_jane_smith_\d{8}$/);
    });

    test('should convert names to lowercase', () => {
      const userId = generateCustomUserId('ALICE', 'BOB');
      
      expect(userId).toMatch(/^alice_bob_\d{8}$/);
    });
  });

  describe('generateUserIdWithDate function', () => {
    test('should generate user ID with specific date', () => {
      const specificDate = new Date('1999-09-17');
      const userId = generateUserIdWithDate('John Doe', specificDate);
      
      expect(userId).toBe('john_doe_17091999');
    });

    test('should handle names with multiple spaces', () => {
      const specificDate = new Date('2020-12-25');
      const userId = generateUserIdWithDate('Mary Jane Smith', specificDate);
      
      expect(userId).toBe('mary_jane_smith_25122020');
    });

    test('should normalize names properly', () => {
      const specificDate = new Date('1995-03-08');
      const userId = generateUserIdWithDate('  John   Doe  ', specificDate);
      
      expect(userId).toBe('john_doe_08031995');
    });
  });

  describe('validateUserIdFormat function', () => {
    test('should validate correct user ID format', () => {
      expect(validateUserIdFormat('john_doe_17091999')).toBe(true);
      expect(validateUserIdFormat('alice_bob_25122020')).toBe(true);
      expect(validateUserIdFormat('user_name_01012001')).toBe(true);
    });

    test('should reject invalid formats', () => {
      expect(validateUserIdFormat('john_doe_1709199')).toBe(false); // 7 digits
      expect(validateUserIdFormat('john_doe_170919999')).toBe(false); // 9 digits
      expect(validateUserIdFormat('JOHN_DOE_17091999')).toBe(false); // uppercase
      expect(validateUserIdFormat('john-doe-17091999')).toBe(false); // wrong separator
      expect(validateUserIdFormat('john_doe_17/09/1999')).toBe(false); // wrong date format
      expect(validateUserIdFormat('')).toBe(false); // empty string
      expect(validateUserIdFormat(null)).toBe(false); // null
      expect(validateUserIdFormat(undefined)).toBe(false); // undefined
    });
  });

  describe('extractDateFromUserId function', () => {
    test('should extract date from valid user ID', () => {
      const date = extractDateFromUserId('john_doe_17091999');
      
      expect(date).toBeInstanceOf(Date);
      expect(date.getDate()).toBe(17);
      expect(date.getMonth()).toBe(8); // September (0-indexed)
      expect(date.getFullYear()).toBe(1999);
    });

    test('should return null for invalid user ID', () => {
      expect(extractDateFromUserId('invalid_format')).toBeNull();
      expect(extractDateFromUserId('john_doe_1709199')).toBeNull();
      expect(extractDateFromUserId('')).toBeNull();
    });

    test('should handle edge case dates', () => {
      const date1 = extractDateFromUserId('user_01012000');
      expect(date1.getDate()).toBe(1);
      expect(date1.getMonth()).toBe(0); // January
      expect(date1.getFullYear()).toBe(2000);

      const date2 = extractDateFromUserId('user_31122023');
      expect(date2.getDate()).toBe(31);
      expect(date2.getMonth()).toBe(11); // December
      expect(date2.getFullYear()).toBe(2023);
    });
  });

  describe('Integration tests', () => {
    test('should generate and validate user ID', () => {
      const userId = generateUserId();
      expect(validateUserIdFormat(userId)).toBe(true);
      
      const extractedDate = extractDateFromUserId(userId);
      expect(extractedDate).toBeInstanceOf(Date);
    });

    test('should generate custom user ID and validate', () => {
      const userId = generateCustomUserId('Alice', 'Johnson');
      expect(validateUserIdFormat(userId)).toBe(true);
      
      const extractedDate = extractDateFromUserId(userId);
      expect(extractedDate).toBeInstanceOf(Date);
    });
  });
});
