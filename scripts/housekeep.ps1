$env:KEEP_ZIP = 0
$branch = "Langu-v2"
$zip = "ContinueBuilding.zip"

Write-Host "1) Ensure we're on branch $branch"
git checkout $branch

Write-Host "2) Inspect ZIP (if present)"
if (Test-Path $zip) {
  Get-Item $zip | Format-Table Name,Length,LastWriteTime
  Write-Host "---- first 20 entries inside the zip ----"
  if (Get-Command unzip -ErrorAction SilentlyContinue) {
    unzip -l $zip | Select-Object -First 20
  } else {
    Write-Host "unzip not found; skipping zip contents preview"
  }
} else {
  Write-Host "No $zip file found in working dir."
}

if ($env:KEEP_ZIP -eq "1") {
  Write-Host "KEEP_ZIP=1 detected → adding $zip to index"
  git add $zip
} else {
  if (Test-Path $zip) {
    Write-Host "Removing $zip from git index (will keep local file)"
    git rm --cached --quiet $zip 2>$null
    if (-not (Test-Path .gitignore)) {
      "" | Out-File .gitignore -Encoding utf8
    }
    if (-not (Select-String -Path .gitignore -Pattern "^$([Regex]::Escape($zip))$" -Quiet 2>$null)) {
      Add-Content .gitignore $zip
      Write-Host "Added $zip to .gitignore"
      git add .gitignore
    } else {
      Write-Host "$zip already in .gitignore"
    }
  } else {
    Write-Host "No $zip to remove from index."
  }
}

Write-Host "3) Stage housekeeping files (.github, .vscode, .gitignore if changed)"
if (Test-Path .github) { git add .github }
if (Test-Path .vscode) { git add .vscode }
git add .gitignore 2>$null

Write-Host "4) Show staged changes (brief)"
git status -sb
Write-Host "Staged files:"
git diff --cached --name-only

Write-Host "5) Commit"
git commit -m "Fix post-merge housekeeping after protozip sync" 2>$null
if ($LASTEXITCODE -ne 0) { Write-Host "Nothing to commit" }

Write-Host "6) Push branch $branch -> origin/$branch"
git push origin $branch

Write-Host "`nDone. If you stashed work on main earlier:"
Write-Host "  git checkout main"
Write-Host "  git stash list"
Write-Host "  git stash apply temp-before-protozip-merge"

