# FROM REPO ROOT — one paste. This finds the most recent "chore/organize-untracked*" branch, opens the PR compare page in your browser, and prints the URL.

# If nothing is found it will list recent local branches so you can pick.

# find branch
$branch = git branch --list "chore/organize-untracked*" | ForEach-Object { $_.Trim() } | Select-Object -First 1

if (-not $branch) {
  Write-Host "No local chore/organize-untracked* branch found. Showing recent branches (pick one to open a PR):" -ForegroundColor Yellow
  git for-each-ref --sort=-committerdate --format='%(refname:short)' refs/heads | Select-Object -First 20
  exit 0
}

# sanitize branch name (remove leading '* ' if present)
$branch = $branch -replace '^\*\s*',''

$owner = "Blackstonehr"
$repo  = "Lang"
$url = "https://github.com/$owner/$repo/compare/main...$branch"

Write-Host "Opening PR compare URL for branch:`n$url" -ForegroundColor Green
Start-Process $url
$url

