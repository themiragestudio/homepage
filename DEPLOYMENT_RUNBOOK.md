# Deployment Runbook - Homepage Project

**Last Updated:** 2026-03-11  
**Owner:** Mirage Team  
**Priority:** P1 - Critical Infrastructure

## Table of Contents
1. [Normal Deployment](#normal-deployment)
2. [Emergency Procedures](#emergency-procedures)
3. [Failure Scenarios](#failure-scenarios)
4. [Monitoring](#monitoring)
5. [Rollback Procedures](#rollback-procedures)

---

## Normal Deployment

### Pre-Deployment Checklist
- [ ] All tests passing locally
- [ ] Code reviewed and approved
- [ ] No known critical bugs
- [ ] Deployment window confirmed (avoid peak hours)

### Deployment Process
1. **Merge to main branch**
   ```bash
   git checkout main
   git pull origin main
   git merge feature-branch
   git push origin main
   ```

2. **Monitor GitHub Actions**
   - Go to: https://github.com/themiragestudio/homepage/actions
   - Watch the deployment pipeline
   - Expected duration: 2-3 minutes

3. **Verify Deployment**
   - Wait 30 seconds for CDN propagation
   - Visit: https://themiragestudio.github.io/homepage/
   - Check:
     - [ ] Page loads (HTTP 200)
     - [ ] No console errors
     - [ ] Styles applied correctly
     - [ ] Interactive elements work
     - [ ] Mobile responsive

4. **Post-Deployment**
   - Update CHANGELOG.md
   - Notify team in chat
   - Monitor for 15 minutes

---

## Emergency Procedures

### 🚨 Site is Down / Broken

**Immediate Actions (< 5 minutes):**

1. **Assess the situation**
   ```bash
   # Check if site is accessible
   curl -I https://themiragestudio.github.io/homepage/
   
   # Check latest deployment
   cd ~/path/to/homepage
   gh run list --limit 5
   ```

2. **Initiate emergency rollback**
   ```bash
   cd ~/path/to/homepage
   ./emergency-rollback.sh
   ```
   
   Choose option 2 (force push) for immediate rollback.

3. **Verify rollback successful**
   - Check GitHub Actions for new deployment
   - Verify site is accessible
   - Confirm functionality restored

4. **Notify stakeholders**
   - Post in team chat: "Site issue detected, rollback initiated"
   - Update status page if available

**Follow-up Actions (< 1 hour):**

5. **Investigate root cause**
   - Review failed deployment logs
   - Check commit that caused failure
   - Document findings

6. **Create incident report**
   - What happened
   - When it happened
   - How long site was affected
   - Root cause
   - Prevention measures

---

## Failure Scenarios

### Scenario 1: Build Failure

**Symptoms:**
- GitHub Actions shows red X
- Build job failed
- Deploy job skipped

**Impact:** Low (previous deployment still live)

**Resolution:**
1. Check build logs for error
2. Fix the issue locally
3. Test build locally: `cd code/homepage-react && pnpm run build`
4. Push fix
5. Monitor new deployment

**Prevention:**
- Always test build locally before pushing
- Use pre-commit hooks
- Enable branch protection with required checks

---

### Scenario 2: Build Succeeds but Site Broken

**Symptoms:**
- GitHub Actions shows green checkmark
- Site loads but doesn't work correctly
- Console errors
- Missing styles/functionality

**Impact:** High (broken site is live)

**Resolution:**
1. **Immediate:** Run emergency rollback
   ```bash
   ./emergency-rollback.sh
   ```

2. **Investigation:**
   - Check browser console for errors
   - Review recent changes
   - Test locally with production build
   - Identify breaking change

3. **Fix:**
   - Create hotfix branch
   - Fix the issue
   - Test thoroughly
   - Deploy fix

**Prevention:**
- Add smoke tests to CI
- Test production build locally
- Use staging environment
- Implement feature flags

---

### Scenario 3: Deployment Timeout/Interruption

**Symptoms:**
- Deployment job hangs
- Timeout error
- Partial deployment

**Impact:** Medium to High (site may be in inconsistent state)

**Resolution:**
1. **Check deployment status**
   ```bash
   gh run view --log
   ```

2. **If stuck > 10 minutes:**
   - Cancel the run
   - Trigger manual deployment:
     ```bash
     gh workflow run deploy-safe.yml
     ```

3. **If deployment partially completed:**
   - Verify site status
   - If broken, rollback
   - If working, monitor closely

**Prevention:**
- Set reasonable timeouts
- Implement deployment health checks
- Use atomic deployments when possible

---

### Scenario 4: GitHub Pages Service Issue

**Symptoms:**
- All checks pass
- Deployment succeeds
- Site returns 404 or 503

**Impact:** High (site unavailable, not our fault)

**Resolution:**
1. **Verify it's GitHub's issue**
   - Check GitHub Status: https://www.githubstatus.com/
   - Check other GitHub Pages sites

2. **If GitHub issue:**
   - Wait for resolution
   - Monitor GitHub Status
   - Notify users of external issue

3. **If not GitHub issue:**
   - Check repository settings
   - Verify GitHub Pages is enabled
   - Check custom domain configuration
   - Review deployment logs

**Prevention:**
- Consider multi-CDN strategy
- Have backup hosting ready
- Document alternative deployment methods

---

## Monitoring

### Automated Checks
- GitHub Actions status (automatic)
- Post-deployment verification (automatic)
- Build artifact validation (automatic)

### Manual Checks (Daily)
```bash
# Quick health check
curl -I https://themiragestudio.github.io/homepage/

# Full check
curl -s https://themiragestudio.github.io/homepage/ | grep -o "<title>[^<]*"
```

### Metrics to Track
- Deployment frequency
- Deployment success rate
- Time to deploy
- Rollback frequency
- Mean time to recovery (MTTR)

### Alert Conditions
- ❌ Build failure
- ❌ Deployment failure
- ❌ Verification failure
- ⚠️ Deployment time > 5 minutes
- ⚠️ Build warnings

---

## Rollback Procedures

### Method 1: Automated Rollback (Recommended)

**When to use:** Site is broken, need immediate fix

```bash
cd ~/path/to/homepage
./emergency-rollback.sh
```

**Steps:**
1. Script finds last successful deployment
2. Creates rollback branch
3. Choose rollback method:
   - Option 1: Create PR (safer)
   - Option 2: Force push (immediate)
4. Monitor new deployment
5. Verify site restored

**Time to recovery:** 3-5 minutes

---

### Method 2: Manual Rollback via GitHub UI

**When to use:** Automated script not available

**Steps:**
1. Go to: https://github.com/themiragestudio/homepage/actions
2. Find last successful deployment
3. Click on the run
4. Click "Re-run all jobs"
5. Wait for deployment
6. Verify site restored

**Time to recovery:** 5-10 minutes

---

### Method 3: Git Revert

**When to use:** Need to preserve history, not urgent

```bash
# Find the bad commit
git log --oneline

# Revert it
git revert <bad-commit-sha>

# Push
git push origin main
```

**Time to recovery:** 5-10 minutes

---

## Testing Rollback

**Recommended:** Test rollback procedure quarterly

```bash
# 1. Create test branch with intentional break
git checkout -b test-rollback
echo "BROKEN" > code/homepage-react/src/App.tsx
git commit -am "test: intentional break for rollback test"
git push origin test-rollback

# 2. Merge to main (in test environment)
# 3. Verify site breaks
# 4. Execute rollback
./emergency-rollback.sh

# 5. Verify rollback works
# 6. Document any issues
# 7. Clean up test branch
```

---

## Contacts

### On-Call Rotation
- **Primary:** Michael Scott (Manager)
- **Secondary:** Victor Blake (Engineer)
- **Escalation:** Quin (Creator)

### Communication Channels
- **Urgent:** Direct message
- **Updates:** Team chat
- **Post-mortem:** Email + documentation

---

## Appendix: Common Commands

```bash
# Check deployment status
gh run list --limit 5

# View specific run
gh run view <run-id>

# View logs
gh run view <run-id> --log

# Trigger manual deployment
gh workflow run deploy-safe.yml

# Check site status
curl -I https://themiragestudio.github.io/homepage/

# Download current live site
wget -r -np -k https://themiragestudio.github.io/homepage/

# Test build locally
cd code/homepage-react
pnpm install
pnpm run build
pnpm run preview
```

---

## Document History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-11 | Initial creation | Michael Scott |
| | Added emergency procedures | |
| | Added failure scenarios | |
| | Added rollback procedures | |

---

**Remember:** When in doubt, rollback first, investigate later. Site uptime is priority #1.
