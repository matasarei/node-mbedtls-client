# 2.3.0

## Major Features
* ✅ **Node.js 24.x Support**: Full compatibility with Node.js 24.x using C++20 standard
* ✅ **Comprehensive Test Suite**: 10 test cases covering all major functionality
* ✅ **CI/CD Pipeline**: GitHub Actions workflows for automated testing and releases
* ✅ **Cross-Platform Testing**: Automated testing on Ubuntu, macOS, and Windows
* ✅ **Multi-Version Support**: Tested on Node.js 18.x, 20.x, 22.x, and 24.x

## Build System Improvements
* Updated `binding.gyp` to use C++20 standard for Node.js v24 compatibility
* Enhanced build configuration with proper MACOSX_DEPLOYMENT_TARGET
* Fixed C++ header compatibility issues on macOS

## Testing Infrastructure
* Custom test framework with describe/it pattern
* PSK authentication testing to avoid certificate dependencies
* Native module binding validation
* Integration tests with proper error handling
* Code linting with legacy file support
* Performance measurement and timeout handling

## CI/CD & Quality Assurance
* **GitHub Actions CI**: Cross-platform testing matrix
* **Release workflow**: Automated NPM publishing with full validation
* **Maintenance workflow**: Weekly security audits and dependency monitoring
* **Issue templates**: Structured bug reports and feature requests
* **Pull request templates**: Comprehensive review guidelines
* **Contributing guide**: Complete development setup instructions

## Documentation
* Updated README with CI badges and compatibility matrix
* Comprehensive test documentation
* CI/CD setup documentation
* Node.js version compatibility guide

## Security & Maintenance
* Weekly automated security audits
* Dependency vulnerability scanning
* mbedTLS submodule version monitoring
* Package validation and integrity checks

# 2.2.1
* Previous fixes and improvements

# 2.2.0
* Node.js 12
* mbedtls 2.27

# 2.1.0

* updating mbedtls submodule to 2.9.0

# 2.0.2

* Allow custom socket binding
* Remove test certs
* Increase max content size

# 2.0.1

* Fix usage of public key

# 2.0.0

* Remove public key argument

# 1.0.4

* Update mbedtls that plays nice with GCC

# 1.0.3

* Return `int` from `DtlsSocket::close` that indicates when a close alert will not be sent.

# 1.0.2

* Fix send callback handling to prevent deadlock

# 1.0.1

* Update mbedtls with queueing fixes

# 1.0.0

* Initial release