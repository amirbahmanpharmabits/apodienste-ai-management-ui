#!/usr/bin/env bash
set -euo pipefail

BRANCH="main"
WORKFLOW="manual-deploy.yml"
REPO="amirbahmanpharmabits/apodienste-ai-management-ui"

cd "$(dirname "$0")/.."

CHANGED_FILES=$(git status --porcelain | wc -l | tr -d ' ')
echo "Changed files: ${CHANGED_FILES}"
echo ""
git --no-pager diff --stat || true
echo ""

read -r -p "Do you want deploy? (yes/deploy): " ANSWER
if [[ "$ANSWER" != "yes" && "$ANSWER" != "deploy" && "$ANSWER" != "yes for deploy" ]]; then
  echo "Deployment cancelled."
  exit 0
fi

if [[ "$CHANGED_FILES" -gt 0 ]]; then
  git add -A
  git commit -m "chore: prepare deployment $(date '+%Y-%m-%d %H:%M:%S')"
fi

git push origin "$BRANCH"
gh workflow run "$WORKFLOW" --repo "$REPO"
echo "Deployment workflow triggered."
