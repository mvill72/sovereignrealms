#!/bin/bash

# Pre-Deployment Checklist for SovereignRealm
# Run this before deploying to production

echo "🏛️  SovereignRealm Pre-Deployment Check"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

CHECKS_PASSED=0
CHECKS_FAILED=0

# Function to check
check() {
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} $1"
    CHECKS_PASSED=$((CHECKS_PASSED + 1))
  else
    echo -e "${RED}✗${NC} $1"
    CHECKS_FAILED=$((CHECKS_FAILED + 1))
  fi
}

# 1. Check if build succeeds
echo "🔨 Checking build..."
bun run build > /dev/null 2>&1
check "Production build succeeds"

# 2. Check for sensitive data in code
echo ""
echo "🔒 Checking for sensitive data..."
! grep -r "PRIVATE_KEY" --include="*.tsx" --include="*.ts" src/ > /dev/null 2>&1
check "No private keys in source code"

! grep -r "0x[0-9a-fA-F]\{64\}" --include="*.tsx" --include="*.ts" src/ > /dev/null 2>&1
check "No hardcoded private keys in code"

# 3. Check .gitignore
echo ""
echo "📝 Checking .gitignore..."
grep -q ".env.local" .gitignore
check ".env.local in .gitignore"

grep -q "node_modules" .gitignore
check "node_modules in .gitignore"

# 4. Check required files exist
echo ""
echo "📄 Checking required files..."
test -f "package.json"
check "package.json exists"

test -f "next.config.ts"
check "next.config.ts exists"

test -f ".env.example"
check ".env.example exists"

test -f "vercel.json"
check "vercel.json exists"

# 5. Check documentation
echo ""
echo "📚 Checking documentation..."
test -f "README.md"
check "README.md exists"

test -f "DEPLOYMENT.md"
check "DEPLOYMENT.md exists"

test -f "BETA_LAUNCH.md"
check "BETA_LAUNCH.md exists"

# 6. Check TypeScript
echo ""
echo "🔍 Checking TypeScript..."
npx tsc --noEmit > /dev/null 2>&1
check "TypeScript compiles without errors"

# 7. Check for console.logs (warning only)
echo ""
echo "⚠️  Warnings (non-critical)..."
if grep -r "console.log" --include="*.tsx" --include="*.ts" src/ > /dev/null 2>&1; then
  echo -e "${YELLOW}⚠${NC}  Found console.log statements (consider removing for production)"
else
  echo -e "${GREEN}✓${NC} No console.log statements found"
fi

# Summary
echo ""
echo "========================================"
echo -e "${GREEN}Passed: $CHECKS_PASSED${NC}"
if [ $CHECKS_FAILED -gt 0 ]; then
  echo -e "${RED}Failed: $CHECKS_FAILED${NC}"
  echo ""
  echo "❌ Fix failed checks before deploying"
  exit 1
else
  echo -e "${GREEN}Failed: 0${NC}"
  echo ""
  echo "✅ All checks passed! Ready to deploy."
  echo ""
  echo "Next steps:"
  echo "1. Get WalletConnect Project ID: https://cloud.walletconnect.com"
  echo "2. Deploy to Vercel: vercel --prod"
  echo "3. Set environment variables in Vercel dashboard"
  echo "4. Test production deployment"
  echo ""
  echo "See DEPLOYMENT.md for full instructions."
  exit 0
fi
