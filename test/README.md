# Tests for node-mbedtls-client

This directory contains the refined test suite for the node-mbedtls-client package.

## Running Tests

```bash
# Run tests
npm test

# Run code quality checks
npm run lint

# Run both tests and linting
npm test && npm run lint
```

## Test Structure

### Basic Tests (`basic.test.js`)

1. **Module Loading Tests**
   - Verifies the main module loads correctly
   - Checks that the `connect` method is exposed

2. **DtlsSocket Class Tests**
   - Tests loading of the DtlsSocket class
   - Verifies socket instance creation with valid PSK options
   - Tests error handling for missing authentication (PSK or private key)
   - Validates socket properties (remoteAddress, remotePort)

3. **Integration Tests**
   - Tests connection attempts with PSK authentication
   - Verifies error handling for invalid certificate paths
   - Tests PSK buffer validation
   - Ensures graceful handling of connection failures

4. **Native Module Tests**
   - Confirms that native bindings are properly loaded
   - Verifies the mbedTLS native socket is accessible
   - Tests availability of native DtlsSocket constructor

## Code Quality

### Test Framework (`test-runner.js`)

The tests use a custom lightweight test framework that provides:
- `describe()` blocks for organizing tests
- `it()` functions for individual test cases
- Timeout handling with inheritance
- Comprehensive error reporting
- Performance measurement (test duration)
- Clean output formatting

### Linting (`lint.js`)

Basic code quality checks including:
- Trailing whitespace detection
- Line length validation (120 characters max)
- Tab vs spaces consistency (for new code only)
- Basic unused variable detection
- Selective linting (strict mode for new code, lenient for legacy files)

## Test Requirements

- The tests require the module to be successfully built with `node-gyp`
- PSK (Pre-Shared Key) authentication is used for connection tests
- Tests are designed to work without requiring an actual DTLS server
- All tests complete within 10 seconds (configurable timeout)

## Test Coverage

The test suite covers:
- ✅ Module loading and API exposure
- ✅ Socket class instantiation and configuration
- ✅ Error handling for invalid inputs
- ✅ Native module binding verification
- ✅ Connection attempt handling
- ✅ PSK authentication validation
- ✅ Certificate error handling

## Performance

- **Test execution**: ~1 second for complete suite
- **Comprehensive coverage**: 10 test cases
- **Efficient timeouts**: Quick failure detection for unreachable services

## Adding New Tests

To add new tests:
1. Create a new `.test.js` file in the `test/` directory
2. Use the `describe()` and `it()` functions to structure your tests
3. Follow the existing patterns for error handling and assertions
4. Run `npm test` to execute all tests
5. Run `npm run lint` to ensure code quality

## Notes

- Tests use PSK authentication to avoid requiring certificate files
- Connection tests handle both successful connections and expected failures
- The test framework is lightweight and designed specifically for this project's needs
- Legacy code files are excluded from strict linting to maintain compatibility
- All new test code follows modern JavaScript practices and coding standards
