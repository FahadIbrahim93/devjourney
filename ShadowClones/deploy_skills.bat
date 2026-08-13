@echo off
REM ═══════════════════════════════════════════════════════════════════
REM deploy_skills.bat — Windows version
REM ═══════════════════════════════════════════════════════════════════

setlocal enabledelayedexpansion

set HERMES_HOME=%USERPROFILE%\.hermes
set SOURCE_DIR=H:\DevJourney\ShadowClones\skills

echo.
echo === HOPE THEORY Skill Deployment (36 skills) ===
echo.

set deployed=0
set errors=0

for %%C in (crypto_sage code_ninja marjahans_merchant snaptrap_stylist build_master truth_seeker) do (
  echo --- %%C ---
  
  if "%%C"=="crypto_sage"      set SKILLS=chart_pattern_recognition onchain_flow_analysis defi_yield_optimizer mining_profitability sentiment_tracker ta_backtester
  if "%%C"=="code_ninja"       set SKILLS=vibe_scaffold api_orchestrator ai_agent_builder automation_script freelance_deliverable ollama_deployer
  if "%%C"=="marjahans_merchant" set SKILLS=product_storyteller seo_optimizer inventory_forecaster campaign_builder influencer_scout competitor_watcher
  if "%%C"=="snaptrap_stylist"  set SKILLS=trend_forecaster drop_planner community_builder visual_identity_guard collab_scout pod_optimizer
  if "%%C"=="build_master"      set SKILLS=proposal_writer project_scoper network_manager cost_estimator permit_navigator innovation_scout
  if "%%C"=="truth_seeker"      set SKILLS=deep_researcher content_engine audience_builder course_creator trend_synthesizer storyteller

  for %%S in (!SKILLS!) do (
    set TARGET=!HERMES_HOME!\profiles\%%C\skills\%%S
    set SOURCE=!SOURCE_DIR!\%%C\%%S
    
    if exist "!SOURCE!" (
      if not exist "!TARGET!" mkdir "!TARGET!"
      xcopy /Y /E /Q "!SOURCE!\*" "!TARGET!\" >nul
      echo   OK %%S
      set /a deployed=!deployed!+1
    ) else (
      echo   FAIL %%S ^(source not found^)
      set /a errors=!errors!+1
    )
  )
)

echo.
echo Deployed: !deployed! / 36
echo Errors:   !errors!
echo.

if !errors! EQU 0 (
  echo All 36 skills deployed!
) else (
  echo Some skills failed.
)
endlocal
