if (Get-Command gh -ErrorAction SilentlyContinue) {
  Write-Host "gh CLI found — setting secret and attempting to merge PR..." -ForegroundColor Green

  gh secret set SITE_URL --body "https://langtwo.vercel.app" --repo Blackstonehr/Lang
  $prnum = gh pr list --repo Blackstonehr/Lang --head chore/nightly-lhci --state open --json number -q '.[0].number'

  if ($prnum) {
    Write-Host "Merging PR #$prnum (squash + delete branch)..." -ForegroundColor Green
    gh pr merge $prnum --repo Blackstonehr/Lang --squash --delete-branch
    Write-Host "Merge command issued for PR #$prnum" -ForegroundColor Cyan
  } else {
    Write-Host "No open PR found for branch chore/nightly-lhci. If already merged, nothing to do." -ForegroundColor Yellow
    Write-Host "PR URL: https://github.com/Blackstonehr/Lang/compare/main...chore/nightly-lhci" -ForegroundColor Yellow
  }
} else {
  Write-Host "gh CLI not found — follow manual steps:" -ForegroundColor Yellow
  Write-Host "1) Add secret in GitHub UI: https://github.com/Blackstonehr/Lang/settings/secrets/actions" -ForegroundColor White
  Write-Host "   Name: SITE_URL" -ForegroundColor White
  Write-Host "   Value: https://langtwo.vercel.app" -ForegroundColor White
  Write-Host "2) Open PR and Merge: https://github.com/Blackstonehr/Lang/compare/main...chore/nightly-lhci" -ForegroundColor White
  Write-Host "   Use 'Squash and merge' then delete branch." -ForegroundColor White
}

