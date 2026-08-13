@echo off
REM ═══════════════════════════════════════════════════════════════════
REM setup_ollama.bat — Windows Ollama install + setup
REM ═══════════════════════════════════════════════════════════════════

echo.
echo === OLLAMA SETUP - Hope Theory Privacy Mode ===
echo.

REM Step 1: Check if Ollama installed
where ollama >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo [Step 1] Ollama already installed
  ollama --version
) else (
  echo [Step 1] Installing Ollama...
  echo Please download from https://ollama.com/download/windows
  echo After install, run this script again
  pause
  exit /b 1
)
echo.

REM Step 2: Check if running
curl -s http://localhost:11434/api/tags >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo [Step 2] Ollama already running
) else (
  echo [Step 2] Starting Ollama...
  start "Ollama" ollama serve
  timeout /t 5 /nobreak >nul
  curl -s http://localhost:11434/api/tags >nul 2>nul
  if %ERRORLEVEL% NEQ 0 (
    echo Failed to start Ollama
    exit /b 1
  )
)
echo.

REM Step 3: Pull models
echo [Step 3] Pulling models...
ollama list | findstr "llama3.1:8b" >nul
if %ERRORLEVEL% EQU 0 (
  echo llama3.1:8b already pulled
) else (
  echo Pulling llama3.1:8b...
  ollama pull llama3.1:8b
)

ollama list | findstr "qwen2.5-coder:7b" >nul
if %ERRORLEVEL% EQU 0 (
  echo qwen2.5-coder:7b already pulled
) else (
  echo Pulling qwen2.5-coder:7b...
  ollama pull qwen2.5-coder:7b
)
echo.

REM Step 4: Test
echo [Step 4] Testing model...
ollama run llama3.1:8b "Say 'ollama working' in 1 sentence" --verbose=false
echo.

REM Step 5: Configure profiles
echo [Step 5] Configuring Hermes profiles...
for %%P in (marjahans_merchant snaptrap_stylist) do (
  if exist "%USERPROFILE%\.hermes\profiles\%%P" (
    echo Configuring %%P...
    hermes -p %%P config set model.default ollama/llama3.1:8b
    hermes -p %%P config set model.base_url http://localhost:11434/v1
  ) else (
    echo %%P not found, run setup_profiles.bat first
  )
)
echo.

echo === SETUP COMPLETE ===
echo.
echo Test from Hermes:
echo   hermes -p marjahans_merchant chat -q "Test"
echo   hermes -p snaptrap_stylist chat -q "Test"
echo.
echo Privacy: customer data stays LOCAL. $0/month.
