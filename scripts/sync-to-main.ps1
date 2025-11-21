Set-StrictMode -Version Latest
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

git fetch origin --prune

# switch to main and pull latest
git checkout main
git pull origin main

# remove stale local branch if it exists (safe delete if merged; force-delete fallback)
$br = (git branch --list chore/nightly-lhci).Trim()
if ($br) {
  git branch -d chore/nightly-lhci 2>$null
  if ($LASTEXITCODE -ne 0) {
    git branch -D chore/nightly-lhci 2>$null
  }
  Write-Host "Removed local branch chore/nightly-lhci"
} else {
  Write-Host "Local branch chore/nightly-lhci not present"
}

# show concise status so you can confirm everything
Write-Host "`n=== GIT STATUS ==="
git status --porcelain --branch

Write-Host "`n=== STASH LIST ==="
$stashResult = git stash list 2>&1
if ($LASTEXITCODE -eq 0 -and $stashResult) {
  Write-Host $stashResult
} else {
  Write-Host "(no stash items)"
}

Write-Host "`n=== UNTRACKED FILES (helpers/docs/logs) ==="
git ls-files --others --exclude-standard | Tee-Object untracked_files.txt

Write-Host "`nSaved untracked file list to ./untracked_files.txt. If you want to move helper scripts into dev-scripts and ignore them, run the optional block below.`n"

Write-Host "Optional: to move helper scripts into dev-scripts and add to .gitignore, copy-paste the SECOND block below."

