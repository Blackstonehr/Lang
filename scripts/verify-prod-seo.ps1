Write-Host "=== PROD robots.txt ==="
$robots = (Invoke-WebRequest -Uri "https://langtwo.vercel.app/robots.txt" -UseBasicParsing).Content
Write-Host $robots

Write-Host ""
Write-Host "=== robots.txt -> sitemap line ==="
if ($robots -match "sitemap") {
  $robots -split "`n" | Select-String -Pattern "sitemap" -CaseSensitive:$false
} else {
  Write-Host "no sitemap line found"
}

Write-Host ""
Write-Host "=== sitemap HEAD ==="
try {
  $sitemapResp = Invoke-WebRequest -Uri "https://langtwo.vercel.app/sitemap.xml" -Method Head -UseBasicParsing
  Write-Host "Status: $($sitemapResp.StatusCode)"
  Write-Host "Content-Type: $($sitemapResp.Headers['Content-Type'])"
} catch {
  Write-Host "Error: $($_.Exception.Message)"
}

Write-Host ""
Write-Host "=== initial HTML (first 300 lines) -> JSON-LD presence ==="
$html = (Invoke-WebRequest -Uri "https://langtwo.vercel.app" -UseBasicParsing).Content
$htmlLines = $html -split "`n" | Select-Object -First 300
$jsonLdFound = $htmlLines | Select-String -Pattern '<script type="application/ld\+json"' -CaseSensitive:$false

if ($jsonLdFound) {
  Write-Host "JSON-LD script tag found:"
  $jsonLdFound | ForEach-Object { Write-Host "Line: $_" }
} else {
  Write-Host "JSON-LD not found in initial HTML"
}

Write-Host ""
Write-Host "=== If JSON-LD found, show the surrounding snippet (50 lines) ==="
if ($jsonLdFound) {
  $jsonLdIndex = 0
  for ($i = 0; $i -lt $htmlLines.Length; $i++) {
    if ($htmlLines[$i] -match 'application/ld\+json') {
      $jsonLdIndex = $i
      break
    }
  }
  $start = [Math]::Max(0, $jsonLdIndex - 10)
  $end = [Math]::Min($htmlLines.Length - 1, $jsonLdIndex + 40)
  $htmlLines[$start..$end] | ForEach-Object { Write-Host $_ }
}

