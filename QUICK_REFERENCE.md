# CI/CD Quick Reference Card

**Last Updated:** 2026-03-11

---

## 🚀 Normal Deployment

```bash
# Just push to main - automatic deployment
git push origin main

# Monitor at:
# https://github.com/themiragestudio/homepage/actions
```

**Expected time:** 2-3 minutes  
**Stages:** Build → Backup → Deploy → Verify → Notify

---

## 🚨 Emergency Rollback

```bash
cd ~/path/to/homepage
./emergency-rollback.sh

# Follow prompts:
# Option 1: Create PR (safer)
# Option 2: Force push (immediate)
```

**Recovery time:** <5 minutes

---

## ✅ Verify Deployment

```bash
# Quick check
curl -I https://themiragestudio.github.io/homepage/

# Full test
./test-pipeline.sh
```

---

## 📊 Check Status

```bash
# Recent deployments
gh run list --limit 5

# Specific run details
gh run view <run-id>

# View logs
gh run view <run-id> --log
```

---

## 🔍 Troubleshooting

### Build Failed
- Check logs: `gh run view --log-failed`
- Fix locally: `cd code/homepage-react && pnpm run build`
- Push fix

### Site Broken After Deployment
- **Immediate:** Run `./emergency-rollback.sh`
- Choose option 2 (force push)
- Investigate after site is restored

### Deployment Stuck
- Wait 10 minutes
- If still stuck: Cancel and re-run
- `gh run cancel <run-id>`
- `gh workflow run deploy-safe.yml`

---

## 📚 Documentation

- **Full runbook:** `DEPLOYMENT_RUNBOOK.md`
- **Analysis:** `CI_CD_ANALYSIS.md`
- **Implementation:** `IMPLEMENTATION_GUIDE.md`

---

## 📞 Contacts

- **Primary:** Michael Scott (Manager)
- **Secondary:** Victor Blake (Engineer)
- **Escalation:** Quin (Creator)

---

## 🎯 Key Safety Features

✅ Build validation  
✅ Output validation  
✅ Pre-deployment backup  
✅ Post-deployment verification  
✅ Automatic rollback trigger  
✅ Manual rollback script  
✅ Comprehensive logging

---

**Remember:** When in doubt, rollback first, investigate later.
