# Mouse / Cursor Fix — Fantech X9 Thor

Run ALL of these in the elevated Command Prompt / PowerShell (Run as administrator).
After running, unplug and replug the mouse, then check for cursor.

## 1) Fix corrupted mouse class GUID
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4D36E96A-E325-11CE-BFC1-08002BE10318}" /v Class /t REG_SZ /d Mouse /f

## 2) Rebuild mouse class entries
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4D36E96A-E325-11CE-BFC1-08002BE10318}\0001" /f

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4D36E96A-E325-11CE-BFC1-08002BE10318}\0001" /v Class /t REG_SZ /d Mouse /f

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4D36E96A-E325-11CE-BFC1-08002BE10318}\0001" /v ClassDesc /t REG_SZ /d "@%SystemRoot%\System32\SysClass.Dll,-3001" /f

reg add "HKLM\SYSTEM\CurrentControlSet\Control\Class\{4D36E96A-E325-11CE-BFC1-08002BE10318}\0001" /v IconPath /t REG_MULTI_SZ /d "%SystemRoot%\System32\setupapi.dll,-9" /f

## 3) Ensure cursor suppression is off and restart mouse stack
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" /v EnableCursorSuppression /t REG_DWORD /d 0 /f

sc start mouhid

sc start mouclass
