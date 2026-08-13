# QUARTERLY BACKUP STRATEGY 2026

## BACKUP SCHEDULE

| Month | Task |
|-------|------|
| June 2026 | Initial backup + cloud sync setup |
| September 2026 | Backup review + incremental |
| December 2026 | Year-end full backup |

---

## BACKUP LOCATIONS

### PRIMARY (Local)
- **H:\DevJourney** - Main project directory
- **C:\Users\fhdib\Documents** - Work documents

### SECONDARY (External)
- **G:\Backup\DevJourney** - External drive mirror
- **G:\Projects-Archive** - Archived projects

### CLOUD BACKUP
- **GitHub** - Code repositories
- **Google Drive** - Critical documents

---

## AUTOMATION SCRIPT

### backup-quarterly.ps1
```powershell
# Quarterly Backup Script
$backupDate = Get-Date -Format "yyyy-MM-dd"
$sourcePaths = @(
    "H:\DevJourney",
    "C:\Users\fhdib\Documents\Job-Applications",
    "C:\Users\fhdib\Documents\AI-Training"
)
$destPath = "G:\Backup\DevJourney-$backupDate"

# Create backup directory
New-Item -ItemType Directory -Path $destPath -Force

# Copy files
foreach ($path in $sourcePaths) {
    if (Test-Path $path) {
        robocopy $path "$destPath" /MIR /Z /R:3 /W:5
    }
}

Write-Host "Backup completed: $destPath"
```

---

## CRITICAL FILES TO BACKUP

1. **Job Landing Kit** (`H:\DevJourney\job_landing\`)
2. **Resume + Applications** (`My_Resume.pdf`, `APPLICATION_TEMPLATES.md`)
3. **Income Tracking** (`INCOME_DASHBOARD.html`, `weekly income logs`)
4. **Important Documents** (`AGENTS.md`, `USER.md` if exists)

---

## BACKUP SIZE ESTIMATE

| Source | Size |
|--------|------|
| DevJourney | ~5GB |
| Documents | ~1GB |
| **Total** | **~6GB** |

## STORAGE AVAILABLE
- **G:\ Drive:** 118GB - Sufficient for quarterly backups
- **Cloud:** Use Google Drive (15GB free) for critical files

---

## RESTORE PROCEDURE

If PC failure occurs:
1. Download from GitHub backup
2. Restore from G:\ drive
3. Recreate symlinks:
   - `mklink /D C:\Users\fhdib\Documents\DevJourney H:\DevJourney`