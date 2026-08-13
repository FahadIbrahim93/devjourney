# DevJourney Multi-Agent System

## Overview
Opencode orchestration with Obsidian SecondBrain for Fahad's 6-venture portfolio.

## Quick Start
```bash
# Start everything
H:\DevJourney\start-devjourney.bat

# Or manually:
start obsidian://open?vault=DevJourney%20SecondBrain
opencode
```

## Folder Structure
```
DevJourney/
├── SecondBrain/           ← Obsidian vault for enhanced memory
│   ├── Daily/            ← Daily notes with venture tracking
│   ├── Ventures/         ← Per-business notes
│   ├── Agents/           ← Agent documentation
│   ├── Templates/        ← Daily, handoff templates
│   └── Sessions/         ← Session logs
├── .opencode-agents/      ← Agent configuration
│   └── agents.yaml       ← Agent definitions
├── SESSION.md            ← Main session log (linked to Obsidian)
└── start-devjourney.bat  ← Launcher script
```

## Agents
| Agent | Role | Scope |
|-------|------|-------|
| Herman | Coordinator | Routes tasks, tracks revenue |
| @bossops | Operations | 6 physical businesses |
| @devcoach | Development | Code projects |
| @clientflow | Client Delivery | Freelance work |
| @revenuetrack | Finance | Income tracking |

## Quality Gates (MANDATORY)
1. Lint - `npm run lint`
2. Test - `npm test -- --run`
3. Build - `npm run build`
4. Docs - SESSION.md updated
5. Revenue - Outreach sent OR code shipped

## Daily Workflow
1. Open `start-devjourney.bat`
2. Check Obsidian daily note
3. Verify revenue gate (proposals sent today?)
4. Route task via SESSION_TEMPLATE.md
5. Execute with quality gates
6. Update both SESSION.md and Obsidian

## Obsidian Plugins Recommended
- Dataview - Query venture data
- Calendar - Daily notes
- Kanban - Task boards
- Tasks - Task management

## Key Files
- `SecondBrain/00 - Index.md` - Vault entry point
- `SecondBrain/Templates/Daily Note.md` - Daily template
- `.opencode-agents/agents.yaml` - Agent config
- `SESSION_TEMPLATE.md` - Session template