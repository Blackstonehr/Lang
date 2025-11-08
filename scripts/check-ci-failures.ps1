# 1) Set your token (replace the value between quotes)
# $env:GITHUB_TOKEN = "ghp_yourPersonalAccessTokenHere"

if (-not $env:GITHUB_TOKEN) {
  Write-Host "ERROR: GITHUB_TOKEN not set. Set it with:" -ForegroundColor Red
  Write-Host '  $env:GITHUB_TOKEN = "ghp_yourPersonalAccessTokenHere"' -ForegroundColor Yellow
  exit 1
}

# 2) Fetch the first failing workflow run for the latest origin/main commit
Write-Host "Fetching latest from origin..." -ForegroundColor Cyan
git fetch origin 2>$null | Out-Null

$sha = git rev-parse origin/main
Write-Host "Checking runs for commit $sha" -ForegroundColor Cyan

# Query GitHub API for workflow runs
$headers = @{
  Authorization = "token $env:GITHUB_TOKEN"
  Accept = "application/vnd.github.v3+json"
}

$runsUrl = "https://api.github.com/repos/Blackstonehr/Lang/actions/runs?per_page=50&head_sha=$sha"
$runsResponse = Invoke-RestMethod -Uri $runsUrl -Headers $headers -Method Get

# Find first failing run
$failingRun = $runsResponse.workflow_runs | Where-Object { 
  $_.conclusion -ne "success" -and $_.conclusion -ne $null 
} | Select-Object -First 1

if (-not $failingRun) {
  Write-Host "No failing run found for $sha (nothing to fetch)." -ForegroundColor Yellow
  exit 2
}

$runId = $failingRun.id
Write-Host "Found failing run id: $runId" -ForegroundColor Cyan

# Download logs
$logsUrl = "https://api.github.com/repos/Blackstonehr/Lang/actions/runs/$runId/logs"
$tempZip = Join-Path $env:TEMP "run_${runId}_logs.zip"

try {
  Invoke-WebRequest -Uri $logsUrl -Headers $headers -OutFile $tempZip
  Write-Host "Extracting first 300 lines of logs..." -ForegroundColor Cyan
  
  # Extract and show first 300 lines
  $extractPath = Join-Path $env:TEMP "run_${runId}_logs"
  Expand-Archive -Path $tempZip -DestinationPath $extractPath -Force
  
  Get-ChildItem -Path $extractPath -Recurse -File | 
    Get-Content -TotalCount 300 | 
    Select-Object -First 300
  
  # Cleanup
  Remove-Item $tempZip -Force -ErrorAction SilentlyContinue
  Remove-Item $extractPath -Recurse -Force -ErrorAction SilentlyContinue
} catch {
  Write-Host "Error downloading logs: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}

