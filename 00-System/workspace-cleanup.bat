@echo off
REM ============================================================
REM  WORKSPACE CLEANUP — Archive non-essential files
REM  Run this to reduce noise and focus on what matters
REM ============================================================

echo.
echo   ^>^>^> 🧹 WORKSPACE CLEANUP ^<^<^<
echo   ----------------------------------------
echo.

set ARCHIVE_DIR="/h/DevJourney/_archive"

REM Create archive directory
if not exist %ARCHIVE_DIR% mkdir %ARCHIVE_DIR%
mkdir %ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup 2>nul

REM Move non-essential brand docs to archive
echo Archiving personal brand content (non-job-search)...

move "/h/DevJourney/Digital_Presence_Overhaul/WEEK1_CONTENT_VAULT.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/WEEK2_CONTENT_VAULT.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/CONTENT_IDEAS_BANK.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/CONTENT_CALENDAR_30DAYS.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/CONTENT_REPURPOSING_SYSTEM.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/INSTAGRAM_CONTENT_PACK.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/MASTER_DIGITAL_OVERHAUL.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/LINKEDIN_PROFILE_PACKAGE.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/X_PROFILE_PACKAGE.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/BRAND_CONSISTENCY_GUIDE.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/DESIGN_ASSETS_SPEC.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/WEBSITE_INSTAGRAM_STRATEGY.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/newsletter-welcome-sequence.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/github-actions-profile-update.yml" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/venture-dashboard.html" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul
move "/h/DevJourney/Digital_Presence_Overhaul/Z_FINAL_AUDIT.md" "%ARCHIVE_DIR%\Digital_Presence_Overhaul_Backup\" 2>nul

echo.
echo ✅ Archive complete. Check %ARCHIVE_DIR%
echo.
echo ┌─────────────────────────────────────────────────────┐
echo │  FOCUS ON WHAT MATTERS NOW:                         │
echo │                                                     │
echo │  📂 _SYSTEMS\ — Prevention + Master Plan           │
echo │  📂 Remote_Job_Search\ — Job applications           │
echo │  📂 Digital_Presence_Overhaul\ — Keep essentials   │
echo └─────────────────────────────────────────────────────┘
echo.
pause
