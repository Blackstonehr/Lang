Start-Sleep -Seconds 8

$maxAttempts = 20
$attempt = 0
$updated = $false

while ($attempt -lt $maxAttempts -and -not $updated) {
  Write-Host "Check #$($attempt+1) - fetching robots.txt..."
  try {
    $robots = (Invoke-WebRequest -Uri "https://langtwo.vercel.app/robots.txt" -UseBasicParsing).Content
    if ($robots -match "langtwo\.vercel\.app/sitemap\.xml") {
      Write-Host "ROBOTS updated to langtwo.vercel.app"
      $updated = $true
      break
    }
    Write-Host "Still old. Sleeping 15s..."
    Start-Sleep -Seconds 15
    $attempt++
  } catch {
    Write-Host "Error fetching robots.txt: $($_.Exception.Message)"
    Start-Sleep -Seconds 15
    $attempt++
  }
}

Write-Host "`n=== PROD robots.txt ==="
try {
  $robots = (Invoke-WebRequest -Uri "https://langtwo.vercel.app/robots.txt" -UseBasicParsing).Content
  Write-Host $robots
} catch {
  Write-Host "curl failed: $($_.Exception.Message)"
}

Write-Host "`n=== SITEMAP HEAD ==="
try {
  $sitemapResp = Invoke-WebRequest -Uri "https://langtwo.vercel.app/sitemap.xml" -Method Head -UseBasicParsing
  Write-Host "Status: $($sitemapResp.StatusCode)"
  Write-Host "Content-Type: $($sitemapResp.Headers['Content-Type'])"
} catch {
  Write-Host "sitemap check failed: $($_.Exception.Message)"
}

Write-Host "`n=== initial HTML (first 300 lines) -> JSON-LD presence ==="
try {
  $html = (Invoke-WebRequest -Uri "https://langtwo.vercel.app" -UseBasicParsing).Content
  $htmlLines = $html -split "`n" | Select-Object -First 300
  if ($html -match '<script type="application/ld\+json"') {
    Write-Host "JSON-LD FOUND in initial HTML"
    $htmlLines | Select-String -Pattern '<script type="application/ld\+json">' -Context 0,6
  } else {
    Write-Host "JSON-LD NOT FOUND in initial HTML"
  }
} catch {
  Write-Host "Error fetching HTML: $($_.Exception.Message)"
}

Write-Host "`nDONE. Copy everything above and paste it here prefixed with 'ONE:' so I can confirm or provide the next one-line fix."

