# codexcommit

Instructions for using Codex (inline AI) to prepare code changes for commit.

## How Codex Works
Codex is the inline AI model that edits code within a single file. It does NOT commit changes directly - you commit after Codex makes edits.

## Workflow: Codex → Review → Commit

### Step 1: Use Codex to Make Changes
Add comments in your code to instruct Codex:
```typescript
// AI (Codex): clean up this function, remove console.logs, add proper types
```

Or select code and ask Codex directly:
- "Format this code for commit"
- "Remove console.logs and prepare for commit"
- "Fix TypeScript errors in this file"

### Step 2: Review Codex's Changes
- Check the diff in your editor
- Verify the changes are correct
- Test if needed

### Step 3: Commit the Changes
After Codex edits, commit manually:

```bash
# Stage the file(s) Codex modified
git add path/to/file.tsx

# Commit with a descriptive message
git commit -m "refactor: clean up component per Codex suggestions"

# Or stage all modified files
git add .
git commit -m "chore: apply Codex cleanup across components"
```

## Best Practices
- Use Codex for small, local changes (single file)
- Always review Codex's changes before committing
- Use conventional commit messages (feat:, fix:, refactor:, chore:)
- Commit related changes together
- Never commit without reviewing

## Example Workflow
1. Open a file with issues
2. Add comment: `// AI (Codex): remove unused imports and fix formatting`
3. Codex makes edits
4. Review the changes
5. `git add file.tsx && git commit -m "refactor: clean up imports and formatting"`

