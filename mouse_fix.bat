@echo off
echo Running mouse/cursor fix...
echo.

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4D36E96A-E325-11CE-BFC1-08002BE10318}" /v Class /t REG_SZ /d Mouse /f

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4D36E96A-E325-11CE-BFC1-08002BE10318}\0001" /v Class /t REG_SZ /d Mouse /f

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4D36E96A-E325-11CE-BFC1-08002BE10318}\0001" /v ClassDesc /t REG_SZ /d "@%SystemRoot%\System32\SysClass.Dll,-3001" /f

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4D36E96A-E325-11CE-BFC1-08002BE10318}\0001" /v IconPath /t REG_MULTI_SZ /d "%SystemRoot%\System32\setupapi.dll,-9" /f

reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v EnableCursorSuppression /t REG_DWORD /d 0 /f

sc start mouhid

sc start mouclass

echo.
echo Done. Unplug and replug the mouse now.
pause
