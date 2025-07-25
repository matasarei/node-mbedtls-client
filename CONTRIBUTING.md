# Contributing to node-mbedtls-client

Thank you for your interest in contributing to node-mbedtls-client! This guide will help you get started.

## Development Setup

### Prerequisites
- Node.js 18.x or later (tested up to Node.js 24.x)
- Python 3.x (for node-gyp)
- C++ compiler with C++20 support:
  - **Linux**: GCC >= 12.2 or Clang with C++20 support
  - **macOS**: macOS 13.5+ with Xcode >= 16.1 (for Node.js 24 compatibility)
  - **Windows**: Visual Studio 2022 or later

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/matasarei/node-mbedtls-client.git
cd node-mbedtls-client

# Initialize mbedTLS submodule
git submodule update --init mbedtls

# Install dependencies and build
npm install
```

### Building
```bash
# Build the native module
npm run build

# or for development
node-gyp configure build
```

### Running Tests
```bash
# Run all tests
npm test

# Run linting
npm run lint

# Run both
npm test && npm run lint
```

## Code Style

### JavaScript
- Use 2 spaces for indentation
- No trailing whitespace
- Lines should not exceed 120 characters
- Use const/let instead of var
- Follow existing code patterns

### C++
- Follow existing indentation style in the native code
- Use meaningful variable names
- Add comments for complex logic

### Testing
- Write tests for new features
- Ensure existing tests continue to pass
- Tests should be deterministic and not require external services
- Use PSK authentication in tests to avoid certificate file dependencies

## Pull Request Process

1. **Fork the repository** and create your branch from `master`
2. **Make your changes** following the code style guidelines
3. **Add or update tests** as needed
4. **Run the test suite** to ensure everything works:
   ```bash
   npm test && npm run lint
   ```
5. **Update documentation** if you're changing APIs or adding features
6. **Submit a pull request** with a clear description of the changes

### Pull Request Guidelines
- Fill out the pull request template completely
- Keep changes focused on a single issue or feature
- Include tests for new functionality
- Update documentation as needed
- Ensure CI passes on all supported platforms

## Reporting Issues

### Bug Reports
Use the bug report template and include:
- Operating system and version
- Node.js version
- Package version
- Complete error messages and stack traces
- Steps to reproduce the issue
- Build output if the issue is build-related

### Feature Requests
Use the feature request template and include:
- Clear description of the problem being solved
- Proposed solution
- Alternative solutions considered
- Impact on existing APIs

## Development Workflow

### Making Changes
1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Test thoroughly on your platform
4. Commit with descriptive messages
5. Push and create a pull request

### Testing on Multiple Platforms
If possible, test your changes on:
- Linux, macOS, Windows (optional)
- Different Node.js versions (18.x, 20.x, 22.x, 24.x)
- Different architectures (x64, arm64)

The CI system will also test your changes across platforms, but local testing helps catch issues early.

## Architecture Overview

This project consists of:
- **JavaScript wrapper** (`index.js`, `socket.js`): High-level API
- **Native C++ module** (`src/`): Interface to mbedTLS
- **mbedTLS library** (`mbedtls/`): Cryptographic implementation
- **Build configuration** (`binding.gyp`): Native module build settings
- **Test suite** (`test/`): Comprehensive testing framework

### Key Files
- `index.js`: Main module entry point
- `socket.js`: DtlsSocket class implementation
- `src/DtlsSocket.cc`: Native C++ implementation
- `binding.gyp`: Build configuration for node-gyp
- `test/basic.test.js`: Test suite
- `test-runner.js`: Custom test framework

## Getting Help

- Check existing issues before creating new ones
- Look at the test suite for usage examples
- Review the documentation in README.md and test/README.md
- For build issues, include the complete build output
- For runtime issues, include error messages and stack traces

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and contribute
- Maintain a professional tone in all interactions

Thank you for contributing to node-mbedtls-client!
