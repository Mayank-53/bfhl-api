/**
 * Simple test script to verify the BFHL API
 * Run this after starting the server with: npm start
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test data from the assignment examples
const testCases = [
  {
    name: 'Example A',
    data: ["a", "1", "334", "4", "R", "$"],
    expected: {
      odd_numbers: ["1"],
      even_numbers: ["334", "4"],
      alphabets: ["A", "R"],
      special_characters: ["$"],
      sum: "339",
      concat_string: "Ra"
    }
  },
  {
    name: 'Example B',
    data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"],
    expected: {
      odd_numbers: ["5"],
      even_numbers: ["2", "4", "92"],
      alphabets: ["A", "Y", "B"],
      special_characters: ["&", "-", "*"],
      sum: "103",
      concat_string: "ByA"
    }
  },
  {
    name: 'Example C',
    data: ["A", "ABcD", "DOE"],
    expected: {
      odd_numbers: [],
      even_numbers: [],
      alphabets: ["A", "ABCD", "DOE"],
      special_characters: [],
      sum: "0",
      concat_string: "EoDdCbAa"
    }
  }
];

async function testAPI() {
  console.log('🧪 Testing BFHL API...\n');

  try {
    // Test health endpoint
    console.log('📡 Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data.status);
    console.log('');

    // Test each example case
    for (const testCase of testCases) {
      console.log(`🧪 Testing ${testCase.name}...`);
      
      try {
        const response = await axios.post(`${BASE_URL}/bfhl`, {
          data: testCase.data
        });

        if (response.status === 200 && response.data.is_success) {
          console.log('✅ Request successful');
          
          // Verify each field
          const result = response.data;
          let allPassed = true;

          // Check required fields
          if (!result.user_id || !result.email || !result.roll_number) {
            console.log('❌ Missing required fields');
            allPassed = false;
          }

          // Check data processing
          if (JSON.stringify(result.odd_numbers) !== JSON.stringify(testCase.expected.odd_numbers)) {
            console.log(`❌ Odd numbers mismatch. Expected: ${JSON.stringify(testCase.expected.odd_numbers)}, Got: ${JSON.stringify(result.odd_numbers)}`);
            allPassed = false;
          }

          if (JSON.stringify(result.even_numbers) !== JSON.stringify(testCase.expected.even_numbers)) {
            console.log(`❌ Even numbers mismatch. Expected: ${JSON.stringify(testCase.expected.even_numbers)}, Got: ${JSON.stringify(result.even_numbers)}`);
            allPassed = false;
          }

          if (JSON.stringify(result.alphabets) !== JSON.stringify(testCase.expected.alphabets)) {
            console.log(`❌ Alphabets mismatch. Expected: ${JSON.stringify(testCase.expected.alphabets)}, Got: ${JSON.stringify(result.alphabets)}`);
            allPassed = false;
          }

          if (JSON.stringify(result.special_characters) !== JSON.stringify(testCase.expected.special_characters)) {
            console.log(`❌ Special characters mismatch. Expected: ${JSON.stringify(testCase.expected.special_characters)}, Got: ${JSON.stringify(result.special_characters)}`);
            allPassed = false;
          }

          if (result.sum !== testCase.expected.sum) {
            console.log(`❌ Sum mismatch. Expected: ${testCase.expected.sum}, Got: ${result.sum}`);
            allPassed = false;
          }

          if (result.concat_string !== testCase.expected.concat_string) {
            console.log(`❌ Concatenated string mismatch. Expected: ${testCase.expected.concat_string}, Got: ${result.concat_string}`);
            allPassed = false;
          }

          if (allPassed) {
            console.log('✅ All validations passed!');
            console.log(`📊 Response:`, JSON.stringify(result, null, 2));
          }
        } else {
          console.log('❌ Request failed:', response.data);
        }
      } catch (error) {
        console.log('❌ Test failed:', error.message);
      }
      
      console.log('');
    }

    // Test error handling
    console.log('🧪 Testing error handling...');
    
    try {
      const errorResponse = await axios.post(`${BASE_URL}/bfhl`, {
        data: "not an array"
      });
      console.log('❌ Should have returned error for invalid input');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Error handling working correctly');
      } else {
        console.log('❌ Unexpected error response:', error.message);
      }
    }

    console.log('\n🎉 API testing completed!');

  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
    console.log('\n💡 Make sure the server is running with: npm start');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
