#!/bin/bash
# Emergency Rollback Script for GitHub Pages Deployment
# Usage: ./emergency-rollback.sh [commit-sha]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚨 Emergency Rollback Script${NC}"
echo "================================"

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ ERROR: GitHub CLI (gh) is not installed${NC}"
    echo "Install it with: brew install gh"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f ".github/workflows/deploy.yml" ] && [ ! -f ".github/workflows/deploy-safe.yml" ]; then
    echo -e "${RED}❌ ERROR: Not in homepage project directory${NC}"
    exit 1
fi

# Get target commit
TARGET_COMMIT="$1"

if [ -z "$TARGET_COMMIT" ]; then
    echo -e "${YELLOW}No commit specified. Finding last successful deployment...${NC}"
    
    # Get last successful deployment
    LAST_SUCCESS=$(gh run list --workflow=deploy.yml --status=success --limit=1 --json headSha --jq '.[0].headSha')
    
    if [ -z "$LAST_SUCCESS" ]; then
        LAST_SUCCESS=$(gh run list --workflow=deploy-safe.yml --status=success --limit=1 --json headSha --jq '.[0].headSha')
    fi
    
    if [ -z "$LAST_SUCCESS" ]; then
        echo -e "${RED}❌ ERROR: Could not find last successful deployment${NC}"
        exit 1
    fi
    
    TARGET_COMMIT="$LAST_SUCCESS"
    echo -e "${GREEN}✅ Found last successful deployment: $TARGET_COMMIT${NC}"
fi

# Confirm rollback
echo ""
echo -e "${YELLOW}⚠️  WARNING: This will rollback to commit $TARGET_COMMIT${NC}"
echo "Current branch: $(git branch --show-current)"
echo "Current commit: $(git rev-parse HEAD)"
echo ""
read -p "Continue with rollback? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}Rollback cancelled${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}🔄 Starting rollback...${NC}"

# Create rollback branch
ROLLBACK_BRANCH="rollback-$(date +%Y%m%d-%H%M%S)"
echo "Creating rollback branch: $ROLLBACK_BRANCH"

git checkout -b "$ROLLBACK_BRANCH"

# Reset to target commit
echo "Resetting to $TARGET_COMMIT..."
git reset --hard "$TARGET_COMMIT"

# Push rollback branch
echo "Pushing rollback branch..."
git push origin "$ROLLBACK_BRANCH"

# Create PR or merge directly
echo ""
echo -e "${YELLOW}Choose rollback method:${NC}"
echo "1) Create Pull Request (safer, allows review)"
echo "2) Force push to main (immediate, risky)"
read -p "Enter choice (1 or 2): " METHOD

if [ "$METHOD" == "1" ]; then
    echo "Creating pull request..."
    gh pr create \
        --title "🚨 Emergency Rollback to $TARGET_COMMIT" \
        --body "Emergency rollback initiated due to deployment failure.

**Target commit:** $TARGET_COMMIT
**Rollback time:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")
**Initiated by:** $(git config user.name)

**Reason:** Deployment verification failed or site is broken.

**Actions taken:**
- Created rollback branch: $ROLLBACK_BRANCH
- Reset to last known good commit
- Awaiting review and merge

**Next steps:**
1. Review this PR
2. Merge to trigger re-deployment
3. Verify site is working
4. Investigate root cause of failure" \
        --base main \
        --head "$ROLLBACK_BRANCH"
    
    echo -e "${GREEN}✅ Pull request created${NC}"
    echo "Review and merge the PR to complete rollback"
    
elif [ "$METHOD" == "2" ]; then
    echo -e "${RED}⚠️  WARNING: This will force push to main!${NC}"
    read -p "Are you absolutely sure? (type 'FORCE' to confirm): " FORCE_CONFIRM
    
    if [ "$FORCE_CONFIRM" == "FORCE" ]; then
        echo "Force pushing to main..."
        git push origin "$ROLLBACK_BRANCH:main" --force
        
        echo -e "${GREEN}✅ Rollback complete${NC}"
        echo "Deployment will trigger automatically"
    else
        echo -e "${YELLOW}Force push cancelled${NC}"
        exit 0
    fi
else
    echo -e "${RED}Invalid choice${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Rollback process completed${NC}"
echo ""
echo "Monitor deployment at:"
echo "https://github.com/themiragestudio/homepage/actions"
echo ""
echo "Verify site at:"
echo "https://themiragestudio.github.io/homepage/"
