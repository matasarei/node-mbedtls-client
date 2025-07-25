# CI/CD Pipeline

Automated testing and deployment for node-mbedtls-client.

## Workflows

### CI Pipeline (`.github/workflows/ci.yml`)
**Triggers:** Pull requests, pushes to main

**Testing Matrix:**
- **Platforms:** Ubuntu, macOS
- **Node.js:** 18.x, 20.x, 22.x, 24.x
- **Tests:** Build, test suite, linting, security audit

### Release Pipeline (`.github/workflows/release.yml`)
**Triggers:** GitHub releases

**Steps:**
1. Run full test matrix
2. Publish to NPM (requires `NPM_TOKEN` secret)

### Maintenance (`.github/workflows/maintenance.yml`)
**Triggers:** Weekly (Sundays), manual

**Tasks:**
- Security audits
- Dependency updates
- mbedTLS submodule monitoring

## Local Development

Run the same CI checks locally:

```bash
npm run build    # Build native module
npm test         # Run test suite
npm run lint     # Code quality checks
```

## Setup Requirements

### NPM Publishing
To enable automated NPM publishing:
1. Generate **Classic Automation token** at npmjs.com:
   - Go to npmjs.com → Account Settings → Access Tokens
   - Click "Generate New Token" → Select "Classic Token"
   - Choose "Automation" type (bypasses 2FA for CI/CD)
2. Add token as `NPM_TOKEN` in GitHub repository secrets
3. Path: Repository Settings → Secrets and variables → Actions

> **Note:** Use "Classic Automation" tokens for CI/CD. Granular tokens have limitations for automated publishing workflows.

### Key Features
- ✅ Cross-platform testing (Ubuntu, macOS)
- ✅ Multi-version Node.js support (18.x-24.x)
- ✅ C++20 and native module compilation
- ✅ Security auditing and dependency monitoring
- ✅ Library-optimized CI (no package-lock.json dependency)

The pipeline ensures quality, security, and compatibility across all supported platforms.
