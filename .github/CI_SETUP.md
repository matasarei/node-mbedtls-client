# GitHub Actions CI/CD Setup Summary

This document summarizes the CI/CD pipeline implemented for the node-mbedtls-client project.

## Workflows Overview

### 1. CI Workflow (`.github/workflows/ci.yml`)
**Triggers**: Push to `master`/`main`, Pull requests

**Jobs**:
- **test**: Cross-platform testing matrix
  - **OS**: Ubuntu, macOS, Windows
  - **Node.js**: 18.x, 20.x, 22.x, 24.x
  - **Steps**: Install deps → Build → Test → Lint → Module load test

- **compatibility-test**: Additional testing on Ubuntu with Node.js 24
  - Extended testing with debug output
  - Example script execution

- **quality**: Code quality and security checks
  - Linting validation
  - Security audit (`npm audit`)
  - Package validation
  - Essential files verification

### 2. Release Workflow (`.github/workflows/release.yml`)
**Triggers**: GitHub releases, Manual dispatch

**Jobs**:
- **build-and-test**: Full testing matrix before release
  - Cross-platform validation
  - Installation testing from tarball
  
- **publish**: NPM publication (release only)
  - Requires `NPM_TOKEN` secret
  - Final validation before publish

### 3. Maintenance Workflow (`.github/workflows/maintenance.yml`)
**Triggers**: Weekly schedule (Sundays 2 AM UTC), Manual dispatch, Package changes

**Jobs**:
- **security-audit**: Regular security checks
  - `npm audit` for vulnerabilities
  - Dependency updates check
  - Package-lock validation

- **dependency-test**: Test with latest dependencies
  - Update dependencies to latest compatible versions
  - Build and test with updates

- **mbedtls-version-check**: Monitor mbedTLS submodule
  - Check current version
  - Report status and last update

## CI Features

### ✅ **Comprehensive Testing**
- **10 test cases** covering all major functionality
- **4 Node.js versions** (18.x through 24.x)
- **3 operating systems** (Ubuntu, macOS, Windows)
- **Native module** build validation
- **Integration testing** with PSK authentication

### ✅ **Quality Assurance**
- **Code linting** with custom rules
- **Security auditing** for vulnerabilities
- **Dependency management** monitoring
- **Performance tracking** (test duration)

### ✅ **Build Validation**
- **Native compilation** testing
- **Module loading** verification  
- **Cross-platform compatibility**
- **Node.js v24** C++20 support

### ✅ **Library-Optimized CI**
- **No package-lock.json dependency** (appropriate for libraries)
- **Fresh dependency resolution** on each build
- **Compatibility testing** with latest package versions
- **Cross-platform validation** without caching assumptions

### ✅ **Development Support**
- **Pull request** templates and validation
- **Issue templates** for bugs and features
- **Contributing guide** with setup instructions
- **Status badges** for repository health

## Local CI Simulation

Developers can run the same checks locally:

```bash
# Full CI pipeline
npm run ci

# Individual steps
npm run build
npm test  
npm run lint
```

## GitHub Repository Features

### Issue Templates
- **Bug reports**: Environment details, build output, reproduction steps
- **Feature requests**: Implementation considerations, compatibility requirements

### Pull Request Template
- **Change type** classification
- **Testing checklist** 
- **Breaking changes** documentation
- **Review guidelines**

### Documentation
- **Contributing guide**: Setup, development workflow, code style
- **README updates**: CI badges, testing instructions, compatibility matrix

## Security & Maintenance

### Automated Security
- **Weekly security audits** via GitHub Actions
- **Dependency vulnerability** scanning
- **Package validation** and integrity checks

### Dependency Management
- **Regular updates** testing
- **Compatibility validation** with latest packages
- **mbedTLS submodule** monitoring

### Release Management
- **Automated testing** before releases
- **Cross-platform validation** 
- **NPM publishing** with full validation

**⚠️ NPM Token Setup Required:**
To enable automated NPM publishing, you need to:
1. Generate an NPM automation token at npmjs.com
2. Add it as `NPM_TOKEN` in GitHub repository secrets
3. Go to: Repository Settings → Secrets and variables → Actions
4. Without this token, the publish job will fail (build-and-test will still work)

**Alternative:** Remove the publish job from `release.yml` for manual publishing

## Status & Monitoring

### Repository Badges
- **CI status**: Build health across platforms
- **Node.js compatibility**: Supported versions
- **NPM version**: Current package version

### Workflow Status
All workflows provide:
- ✅ **Detailed step output**
- ✅ **Error reporting** with context
- ✅ **Performance metrics**
- ✅ **Cross-platform results**

## Benefits

1. **Quality Assurance**: Every change is tested across platforms and Node.js versions
2. **Compatibility**: Ensures Node.js v24 and C++20 support works everywhere  
3. **Security**: Regular vulnerability scanning and dependency monitoring
4. **Developer Experience**: Clear templates, guidelines, and local testing tools
5. **Reliability**: Automated testing prevents regressions and build failures
6. **Maintenance**: Regular dependency and security updates
7. **Library Best Practices**: No lock file dependencies, fresh resolution testing

## Design Decisions

### **Why No package-lock.json Caching?**
- **Library vs Application**: This is a library, not an application
- **Fresh Dependencies**: Each build tests with latest compatible versions
- **User Environment**: Mirrors how end users will install the package
- **Compatibility**: Ensures the package works with various dependency versions
- **Best Practice**: Libraries should not commit lock files

The CI/CD pipeline ensures the node-mbedtls-client project maintains high quality, security, and compatibility across all supported platforms and Node.js versions.
