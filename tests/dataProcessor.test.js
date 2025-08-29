const { 
  processData, 
  isNumber, 
  isAlphabet, 
  isSpecialCharacter, 
  generateAlternatingCapsString 
} = require('../utils/dataProcessor');

describe('Data Processor Tests', () => {
  
  describe('isNumber function', () => {
    test('should identify valid numbers as strings', () => {
      expect(isNumber("1")).toBe(true);
      expect(isNumber("334")).toBe(true);
      expect(isNumber("4")).toBe(true);
      expect(isNumber("0")).toBe(true);
      expect(isNumber("-5")).toBe(true);
    });

    test('should reject non-numbers', () => {
      expect(isNumber("a")).toBe(false);
      expect(isNumber("$")).toBe(false);
      expect(isNumber("")).toBe(false);
      expect(isNumber("abc123")).toBe(false);
    });
  });

  describe('isAlphabet function', () => {
    test('should identify alphabets', () => {
      expect(isAlphabet("a")).toBe(true);
      expect(isAlphabet("R")).toBe(true);
      expect(isAlphabet("ABC")).toBe(true);
      expect(isAlphabet("xyz")).toBe(true);
    });

    test('should reject non-alphabets', () => {
      expect(isAlphabet("1")).toBe(false);
      expect(isAlphabet("$")).toBe(false);
      expect(isAlphabet("")).toBe(false);
      expect(isAlphabet("a1b")).toBe(false);
    });
  });

  describe('isSpecialCharacter function', () => {
    test('should identify special characters', () => {
      expect(isSpecialCharacter("$")).toBe(true);
      expect(isSpecialCharacter("&")).toBe(true);
      expect(isSpecialCharacter("-")).toBe(true);
      expect(isSpecialCharacter("*")).toBe(true);
      expect(isSpecialCharacter("@")).toBe(true);
    });

    test('should reject non-special characters', () => {
      expect(isSpecialCharacter("a")).toBe(false);
      expect(isSpecialCharacter("1")).toBe(false);
      expect(isSpecialCharacter("")).toBe(false);
      expect(isSpecialCharacter("a1")).toBe(false);
    });
  });

  describe('generateAlternatingCapsString function', () => {
    test('should generate alternating caps in reverse order', () => {
      expect(generateAlternatingCapsString("a")).toBe("A");
      expect(generateAlternatingCapsString("ab")).toBe("Ba");
      expect(generateAlternatingCapsString("abc")).toBe("CbA");
      expect(generateAlternatingCapsString("abcd")).toBe("DcBa");
    });

    test('should handle empty string', () => {
      expect(generateAlternatingCapsString("")).toBe("");
    });
  });

  describe('processData function - Example A', () => {
    test('should process ["a","1","334","4","R", "$"] correctly', () => {
      const input = ["a","1","334","4","R", "$"];
      const result = processData(input);

      expect(result.odd_numbers).toEqual(["1"]);
      expect(result.even_numbers).toEqual(["334","4"]);
      expect(result.alphabets).toEqual(["A","R"]);
      expect(result.special_characters).toEqual(["$"]);
      expect(result.sum).toBe("339");
      expect(result.concat_string).toBe("Ra");
    });
  });

  describe('processData function - Example B', () => {
    test('should process ["2","a", "y", "4", "&", "-", "*", "5","92","b"] correctly', () => {
      const input = ["2","a", "y", "4", "&", "-", "*", "5","92","b"];
      const result = processData(input);

      expect(result.odd_numbers).toEqual(["5"]);
      expect(result.even_numbers).toEqual(["2","4","92"]);
      expect(result.alphabets).toEqual(["A", "Y", "B"]);
      expect(result.special_characters).toEqual(["&", "-", "*"]);
      expect(result.sum).toBe("103");
      expect(result.concat_string).toBe("ByA");
    });
  });

  describe('processData function - Example C', () => {
    test('should process ["A","ABcD","DOE"] correctly', () => {
      const input = ["A","ABcD","DOE"];
      const result = processData(input);

      expect(result.odd_numbers).toEqual([]);
      expect(result.even_numbers).toEqual([]);
      expect(result.alphabets).toEqual(["A","ABCD","DOE"]);
      expect(result.special_characters).toEqual([]);
      expect(result.sum).toBe("0");
      expect(result.concat_string).toBe("EoDdCbAa");
    });
  });

  describe('Edge cases', () => {
    test('should handle empty array', () => {
      expect(() => processData([])).toThrow();
    });

    test('should handle mixed data types', () => {
      const input = ["123", "abc", "!@#", "0", "XYZ"];
      const result = processData(input);

      expect(result.odd_numbers).toEqual(["123"]);
      expect(result.even_numbers).toEqual(["0"]);
      expect(result.alphabets).toEqual(["ABC", "XYZ"]);
      expect(result.special_characters).toEqual(["!@#"]);
      expect(result.sum).toBe("123");
      expect(result.concat_string).toBe("ZyXcBa");
    });

    test('should handle only numbers', () => {
      const input = ["1", "2", "3", "4", "5"];
      const result = processData(input);

      expect(result.odd_numbers).toEqual(["1", "3", "5"]);
      expect(result.even_numbers).toEqual(["2", "4"]);
      expect(result.alphabets).toEqual([]);
      expect(result.special_characters).toEqual([]);
      expect(result.sum).toBe("15");
      expect(result.concat_string).toBe("");
    });

    test('should handle only alphabets', () => {
      const input = ["a", "B", "c", "D"];
      const result = processData(input);

      expect(result.odd_numbers).toEqual([]);
      expect(result.even_numbers).toEqual([]);
      expect(result.alphabets).toEqual(["A", "B", "C", "D"]);
      expect(result.special_characters).toEqual([]);
      expect(result.sum).toBe("0");
      expect(result.concat_string).toBe("DcBa");
    });

    test('should handle only special characters', () => {
      const input = ["!", "@", "#", "$"];
      const result = processData(input);

      expect(result.odd_numbers).toEqual([]);
      expect(result.even_numbers).toEqual([]);
      expect(result.alphabets).toEqual([]);
      expect(result.special_characters).toEqual(["!", "@", "#", "$"]);
      expect(result.sum).toBe("0");
      expect(result.concat_string).toBe("");
    });
  });
});
