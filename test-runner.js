#!/usr/bin/env node

// Simple test runner for node-mbedtls-client
const path = require('path');
const fs = require('fs');

// Simple test framework implementation
let tests = [];
let describes = [];
let currentDescribe = null;

global.describe = function(name, fn) {
  const previousDescribe = currentDescribe;
  currentDescribe = { name, tests: [], describes: [], timeout: 2000 };
  
  if (previousDescribe) {
    previousDescribe.describes.push(currentDescribe);
  } else {
    describes.push(currentDescribe);
  }
  
  // Add timeout method to describe context
  const context = {
    timeout: function(ms) {
      currentDescribe.timeout = ms;
    }
  };
  
  fn.call(context);
  currentDescribe = previousDescribe;
};

global.it = function(name, fn) {
  const test = { name, fn };
  if (currentDescribe) {
    currentDescribe.tests.push(test);
  } else {
    tests.push(test);
  }
  
  return test;
};

async function runTest(test, suiteName = '', suiteTimeout = 2000) {
  return new Promise((resolve) => {
    const fullName = suiteName ? `${suiteName} - ${test.name}` : test.name;
    const timeout = suiteTimeout;
    
    let completed = false;
    const timer = setTimeout(() => {
      if (!completed) {
        completed = true;
        resolve({ name: fullName, passed: false, error: new Error(`Test timed out after ${timeout}ms`) });
      }
    }, timeout);
    
    try {
      const result = test.fn((error) => {
        if (!completed) {
          completed = true;
          clearTimeout(timer);
          if (error) {
            resolve({ name: fullName, passed: false, error });
          } else {
            resolve({ name: fullName, passed: true });
          }
        }
      });
      
      // Handle synchronous tests
      if (result === undefined && test.fn.length === 0) {
        if (!completed) {
          completed = true;
          clearTimeout(timer);
          resolve({ name: fullName, passed: true });
        }
      }
    } catch (error) {
      if (!completed) {
        completed = true;
        clearTimeout(timer);
        resolve({ name: fullName, passed: false, error });
      }
    }
  });
}

async function runDescribe(describe, parentName = '') {
  const suiteName = parentName ? `${parentName} > ${describe.name}` : describe.name;
  console.log(`\n${suiteName}`);
  
  const results = [];
  
  // Run tests in this describe
  for (const test of describe.tests) {
    const suiteTimeout = describe.timeout || 2000;
    const result = await runTest(test, suiteName, suiteTimeout);
    results.push(result);
    
    if (result.passed) {
      console.log(`  ✓ ${test.name}`);
    } else {
      console.log(`  ✗ ${test.name}`);
      const errorMsg = result.error ? (result.error.message || result.error.toString()) : 'Unknown error';
      console.log(`    ${errorMsg}`);
    }
  }
  
  // Run nested describes
  for (const nestedDescribe of describe.describes) {
    // Inherit timeout from parent if child doesn't have one
    if (!nestedDescribe.timeout && describe.timeout) {
      nestedDescribe.timeout = describe.timeout;
    }
    const nestedResults = await runDescribe(nestedDescribe, suiteName);
    results.push(...nestedResults);
  }
  
  return results;
}

async function runTests() {
  console.log('Running node-mbedtls-client tests...\n');
  const startTime = Date.now();
  
  // Load test files
  const testDir = path.join(__dirname, 'test');
  if (!fs.existsSync(testDir)) {
    console.log('No test directory found');
    return;
  }
  
  const testFiles = fs.readdirSync(testDir).filter(file => file.endsWith('.test.js'));
  
  for (const testFile of testFiles) {
    console.log(`Loading ${testFile}...`);
    require(path.join(testDir, testFile));
  }
  
  let allResults = [];
  
  // Run standalone tests
  for (const test of tests) {
    const result = await runTest(test);
    allResults.push(result);
    
    if (result.passed) {
      console.log(`✓ ${test.name}`);
    } else {
      console.log(`✗ ${test.name}`);
      const errorMsg = result.error ? (result.error.message || result.error.toString()) : 'Unknown error';
      console.log(`  ${errorMsg}`);
    }
  }
  
  // Run describe blocks
  for (const describe of describes) {
    const results = await runDescribe(describe);
    allResults.push(...results);
  }
  
  // Print summary
  const passed = allResults.filter(r => r.passed).length;
  const failed = allResults.filter(r => !r.passed).length;
  const total = allResults.length;
  const duration = Date.now() - startTime;
  
  console.log(`\nTest Results:`);
  console.log(`Total: ${total}, Passed: ${passed}, Failed: ${failed}`);
  console.log(`Duration: ${duration}ms`);
  
  if (failed > 0) {
    console.log('\nFailed tests:');
    allResults.filter(r => !r.passed).forEach(r => {
      const errorMsg = r.error ? (r.error.message || r.error.toString()) : 'Unknown error';
      console.log(`  - ${r.name}: ${errorMsg}`);
    });
    process.exit(1);
  } else {
    console.log('\nAll tests passed! ✓');
    process.exit(0);
  }
}

if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
