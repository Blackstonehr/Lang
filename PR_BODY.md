Summary
-------
This PR merges Langu-v2 cleanup and quality infra:
- Removed ContinueBuilding.zip and updated .gitignore
- Added Playwright config, tests and quality workflow
- Added .vscode config and .gitattributes to normalize EOLs
- Added verification scripts for CI smoke runs

Test plan
---------
1) Playwright smoke tests pass on preview (see Actions)
2) Preview shows meta tags, JSON-LD, sitemap and robots
3) CI (Playwright + LHCI) completes successfully

Notes
-----
- Add GitHub secrets: SITE_URL (preview/prod) and PROGRAM_SLUG for tests.
- If any CI failure happens, paste the failing log and I'll provide a one-file fix.

