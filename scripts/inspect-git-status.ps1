Write-Host "=== branch & remote ==="
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $branch"
git fetch origin --prune | Out-Null
git status --porcelain --branch

Write-Host ""
Write-Host "=== local vs remote commits (local..remote) ==="
try {
  $remoteBranch = "origin/$branch"
  $result = git rev-list --left-right --count HEAD...$remoteBranch 2>&1
  if ($LASTEXITCODE -eq 0) {
    Write-Host $result
  } else {
    Write-Host "Branch '$remoteBranch' not found on remote (likely merged/deleted)"
  }
} catch {
  Write-Host "Could not compare with remote branch"
}

Write-Host ""
Write-Host "=== Recent commits ==="
git log --oneline --graph --decorate --max-count=10

Write-Host ""
Write-Host "=== unstaged / staged files ==="
Write-Host "Unstaged:"
git diff --name-status
Write-Host "Staged:"
git diff --cached --name-status

Write-Host ""
Write-Host "=== stash list (if any) ==="
git stash list

Write-Host ""
Write-Host "=== Untracked files ==="
git status --porcelain | Select-String -Pattern '^\?\?' | ForEach-Object { $_.Line }

