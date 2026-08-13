# ORGANIZED FOLDER STRUCTURE - DOWNLOADS & DESKTOP

## CURRENT STATE
- Downloads: 2.62GB of mixed files
- Desktop: Clean (0GB)
- Temp cleaned: ~600MB freed

## PROPOSED STRUCTURE

```
C:\Users\fhdib\
├── Documents\
│   ├── Job-Applications\
│   │   ├── Applications\
│   │   ├── Assessment-Copies\
│   │   └── Income-Tracking\
│   ├── Projects\
│   │   ├── DevJourney\ (symlink to H:\DevJourney)
│   │   └── Personal-Projects\
│   └── AI-Training\
│       ├── Scripts\
│       ├── Templates\
│       └── Notes\
│
├── Downloads\
│   ├── Archive\ (installer backups)
│   ├── Current\ (active downloads)
│   ├── Images\
│   │   ├── AI-Generated\
│   │   └── Screenshots\
│   ├── Documents\
│   └── Executables\
│
├── Desktop\
│   └── Quick-Links\
│       ├── Job-Dashboard.bat
│       ├── Income-Tracker.bat
│       └── Reminder-System.bat
│
└── Scripts\
    ├── cleanup-temp.ps1
    ├── check-applications.ps1
    └── backup-quarterly.ps1
```

## AUTOMATION SCRIPTS

### Job-Dashboard.bat
```batch
@echo off
start "" "H:\DevJourney\job_landing\dashboard\INCOME_DASHBOARD.html"
start "" "https://app.outlier.ai/dashboard"
start "" "https://app.dataannotation.tech/me"
echo Job platforms opened!
```

### Cleanup-Shortcuts.bat
```batch
@echo off
mkdir "C:\Users\fhdib\Documents\Job-Applications" 2>nul
mkdir "C:\Users\fhdib\Documents\AI-Training" 2>nul
mkdir "C:\Users\fhdib\Scripts" 2>nul
echo Organized folders created!
```

---

## NEXT STEPS
1. Run folder structure setup script
2. Move existing files to appropriate folders
3. Create desktop shortcuts for quick access
4. Set up quarterly backup schedule