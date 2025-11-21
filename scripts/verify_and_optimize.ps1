Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "=== 0) Environment" -ForegroundColor Cyan
git --version 2>$null | Out-Null
Write-Host ("User: {0}" -f (whoami))
Write-Host ("Date: {0}" -f (Get-Date).ToString("u"))
Write-Host ""

Write-Host "=== 1) Confirm remote branch and latest commit ===" -ForegroundColor Cyan
git fetch origin
$remoteSha = git ls-remote https://github.com/Blackstonehr/Lang.git refs/heads/Langu-v2 2>$null
if ([string]::IsNullOrWhiteSpace($remoteSha)) {
    Write-Host "Remote branch origin/Langu-v2 not found or network issue." -ForegroundColor Red
} else {
    Write-Host "Remote branch found: $($remoteSha.Trim())"
    Write-Host "Latest remote commit (readable):"
    git show --name-only --pretty=format:"%h %s (%an)" origin/Langu-v2 -1
}
Write-Host ""

Write-Host "=== 2) GitHub Actions (requires gh CLI) ===" -ForegroundColor Cyan
if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Host "Listing recent workflow runs for branch Langu-v2..."
    gh run list --branch Langu-v2 --limit 10 --json databaseId,status,conclusion,workflowName,createdAt |
        ConvertFrom-Json | Format-Table -AutoSize
    Write-Host ""
    $wantView = Read-Host "Do you want to view logs for a run id? (paste databaseId or press Enter to skip)"
    if ($wantView) {
        Write-Host "Showing logs for run id $wantView..."
        gh run view $wantView --log
    }
} else {
    Write-Host "gh CLI not found — skip Actions listing. Install: https://cli.github.com/" -ForegroundColor Yellow
}
Write-Host ""

if ($env:PREVIEW_URL) {
    Write-Host "=== 3) Vercel / preview site checks for $env:PREVIEW_URL ===" -ForegroundColor Cyan
    try {
        $headResponse = Invoke-WebRequest -Uri $env:PREVIEW_URL -Method Head -ErrorAction Stop
        Write-Host ("HTTP status: {0}" -f $headResponse.StatusCode)

        Write-Host "`nKey head tags (title/meta/og/json-ld):"
        $pageContent = (Invoke-WebRequest -Uri $env:PREVIEW_URL -UseBasicParsing).Content
        $pageContent -split "`n" |
            Select-String -Pattern "<title", "<meta", "<link rel=`"canonical`"", "application/ld\+json" |
            Select-Object -First 40 | ForEach-Object { $_.Line }

        Write-Host "`nrobots.txt:"
        $robots = Invoke-WebRequest -Uri "$env:PREVIEW_URL/robots.txt" -UseBasicParsing -ErrorAction Stop
        Write-Host ($robots.Content.Trim())

        Write-Host "`nsitemap HEAD:"
        $sitemapHead = Invoke-WebRequest -Uri "$env:PREVIEW_URL/sitemap.xml" -Method Head -ErrorAction Stop
        Write-Host ("Status: {0}" -f $sitemapHead.StatusCode)
    } catch {
        Write-Host "Preview URL check failed: $($_.Exception.Message)" -ForegroundColor Yellow
    }
    Write-Host ""
} else {
    Write-Host "No PREVIEW_URL set — skipping preview checks. To enable, run:`$env:PREVIEW_URL='https://your-preview.vercel.app'` then re-run script." -ForegroundColor Yellow
    Write-Host ""
}

if ($env:SITE_URL) {
    Write-Host "=== 4) Running Playwright smoke tests against $env:SITE_URL ===" -ForegroundColor Cyan
    if (-not (Test-Path node_modules)) {
        Write-Host "Installing npm deps (npm ci) — this may take a minute..." -ForegroundColor Yellow
        npm ci
    }

    Write-Host "Installing Playwright browsers..."
    npx playwright install --with-deps

    Write-Host "Running Playwright tests (only seo.spec.ts if present) ..."
    try {
        npx playwright test --project=chromium tests/seo.spec.ts --retries=0 --reporter=list
    } catch {
        Write-Host "Playwright tests failed or test file not present: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
} else {
    Write-Host "SITE_URL not set — skip Playwright tests. To enable, run:`$env:SITE_URL='https://langtwo.vercel.app'` then re-run script." -ForegroundColor Yellow
    Write-Host ""
}

if ($env:ADD_GITATTR -eq "1") {
    Write-Host "=== 5) Adding .gitattributes and committing (EOL normalization) ===" -ForegroundColor Cyan
    $gitattributes = @"
# force LF on these text files
*.json text eol=lf
*.yml text eol=lf
*.yaml text eol=lf
*.sh  text eol=lf
*.ps1 text eol=lf
*.md  text eol=lf
*.ts  text eol=lf
*.tsx text eol=lf
"@
    if (-not (Test-Path .gitattributes)) {
        $gitattributes | Out-File -FilePath .gitattributes -Encoding utf8
        git add .gitattributes
        git commit -m "chore: add .gitattributes to normalize EOL (prevent CRLF churn)"
        git push origin Langu-v2
        Write-Host ".gitattributes added and pushed." -ForegroundColor Green
    } else {
        Write-Host ".gitattributes already exists — skipping create." -ForegroundColor Yellow
    }
    Write-Host ""
} else {
    Write-Host "ADD_GITATTR not set — skipping .gitattributes add. To enable, set `$env:ADD_GITATTR = '1'` and re-run." -ForegroundColor Yellow
}

Write-Host "=== DONE ===" -ForegroundColor Green
Write-Host "If anything failed, paste the exact console output here and I'll give the single-line fix."

