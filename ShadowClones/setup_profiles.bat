@echo off
REM ═══════════════════════════════════════════════════════════════════
REM setup_profiles.bat — Hope Theory Shadow Clone Jutsu (Windows)
REM Creates all 7 profiles + configures them.
REM Usage: setup_profiles.bat
REM ═══════════════════════════════════════════════════════════════════

setlocal enabledelayedexpansion

set HERMES_HOME=%USERPROFILE%\.hermes
set PROFILES_DIR=%HERMES_HOME%\profiles
set SOURCE_DIR=H:\DevJourney\ShadowClones\profiles
set SHADOW_DIR=H:\DevJourney\ShadowClones

echo.
echo ============================================================
echo  HOPE THEORY - Shadow Clone Jutsu Setup
echo ============================================================
echo.

REM Step 0: Pre-flight
echo [Step 0] Pre-flight checks
where hermes >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo   X hermes CLI not found. Install first.
  exit /b 1
)
echo   OK hermes CLI found
echo.

REM Step 1: Verify Ollama
echo [Step 1] Verify Ollama
curl -s http://localhost:11434/api/tags >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo   OK Ollama running
) else (
  echo   ! Ollama not running. Start with: ollama serve
)
echo.

REM Step 2: Create profiles
echo [Step 2] Create 7 profiles
for %%P in (naruto_main crypto_sage code_ninja marjahans_merchant snaptrap_stylist build_master truth_seeker) do (
  if exist "%PROFILES_DIR%\%%P" (
    echo   SKIP %%P (exists)
  ) else (
    echo   Creating %%P
    hermes profile create %%P 2>nul
    if !ERRORLEVEL! NEQ 0 (
      mkdir "%PROFILES_DIR%\%%P\skills" 2>nul
      mkdir "%PROFILES_DIR%\%%P\plugins" 2>nul
      mkdir "%PROFILES_DIR%\%%P\cron" 2>nul
      mkdir "%PROFILES_DIR%\%%P\memories" 2>nul
    )
  )
)
echo.

REM Step 3: Deploy configs
echo [Step 3] Deploy config.yaml
for %%P in (naruto_main crypto_sage code_ninja marjahans_merchant snaptrap_stylist build_master truth_seeker) do (
  if exist "%SOURCE_DIR%\%%P.yaml" (
    copy /Y "%SOURCE_DIR%\%%P.yaml" "%PROFILES_DIR%\%%P\config.yaml" >nul
    echo   OK %%P.yaml deployed
  ) else (
    echo   X Missing: %%P.yaml
  )
)
echo.

REM Step 4: Skills dirs
echo [Step 4] Create skills directories
for %%P in (naruto_main crypto_sage code_ninja marjahans_merchant snaptrap_stylist build_master truth_seeker) do (
  if not exist "%PROFILES_DIR%\%%P\skills" mkdir "%PROFILES_DIR%\%%P\skills"
)
echo   OK
echo.

REM Step 5: Set default
echo [Step 5] Set naruto_main as sticky default
hermes profile use naruto_main 2>nul
echo.

REM Step 6: Verify
echo [Step 6] Verify
hermes profile list
echo.

echo ============================================================
echo   SETUP COMPLETE
echo ============================================================
echo.
echo Next steps:
echo   1. hermes profile list
echo   2. hermes -p crypto_sage chat -q "Test connection"
echo   3. hermes -p naruto_main
echo   4. hermes kanban init
echo.
endlocal
