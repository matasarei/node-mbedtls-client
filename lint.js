#!/usr/bin/env node

// Simple linter for basic JavaScript issues
const fs = require('fs');
const path = require('path');

function lintFile(filePath, strictMode = true) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Check for common issues (only in strict mode for legacy files)
    if (strictMode && line.includes('\t')) {
      issues.push(`Line ${lineNum}: Use spaces instead of tabs`);
    }
    
    if (line.trim().endsWith(' ')) {
      issues.push(`Line ${lineNum}: Trailing whitespace`);
    }
    
    if (line.length > 120) {
      issues.push(`Line ${lineNum}: Line too long (${line.length} > 120 characters)`);
    }
    
    // Check for unused variables (basic detection)
    const varMatch = line.match(/(?:const|let|var)\s+(\w+)\s*=/);
    if (varMatch) {
      const varName = varMatch[1];
      const remaining = content.substring(content.indexOf(line) + line.length);
      if (!remaining.includes(varName) && varName !== 'module' && varName !== 'require') {
        // Only warn, don't fail, as this is basic detection
        console.warn(`Warning: Variable '${varName}' may be unused in ${filePath}:${lineNum}`);
      }
    }
  });

  return issues;
}

function lintDirectory(dir) {
  let totalIssues = 0;
  
  // Files to exclude from strict linting (legacy code)
  const excludeFromStrictLinting = ['index.js', 'socket.js', 'examples/echo.js'];
  
  function lintRecursive(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const relativePath = path.relative(dir, fullPath);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !['node_modules', 'build', '.git'].includes(item)) {
        lintRecursive(fullPath);
      } else if (stat.isFile() && item.endsWith('.js')) {
        console.log(`Linting ${fullPath}...`);
        
        const isStrictMode = !excludeFromStrictLinting.some(excluded => 
          relativePath === excluded || relativePath.endsWith(excluded)
        );
        
        const issues = lintFile(fullPath, isStrictMode);
        
        if (issues.length > 0) {
          console.log(`  Issues found:`);
          issues.forEach(issue => console.log(`    ${issue}`));
          totalIssues += issues.length;
        } else {
          console.log(`  ✓ No issues found`);
        }
      }
    }
  }
  
  lintRecursive(dir);
  return totalIssues;
}

if (require.main === module) {
  console.log('Running basic lint checks...\n');
  
  const totalIssues = lintDirectory(process.cwd());
  
  console.log(`\nLint Results:`);
  if (totalIssues === 0) {
    console.log('✓ No linting issues found!');
    process.exit(0);
  } else {
    console.log(`Found ${totalIssues} issue(s) that should be fixed.`);
    process.exit(1);
  }
}

module.exports = { lintFile, lintDirectory };
