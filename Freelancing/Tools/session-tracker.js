// session-tracker.js
// Session tracking and accountability system
// Hope Theory - Revenue-First Engineering

const fs = require('fs');
const path = require('path');

class SessionTracker {
    constructor() {
        this.sessionsFile = path.join(__dirname, 'data', 'sessions.json');
        this.ensureDataDir();
    }

    ensureDataDir() {
        const dataDir = path.join(__dirname, 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
    }

    loadSessions() {
        if (fs.existsSync(this.sessionsFile)) {
            return JSON.parse(fs.readFileSync(this.sessionsFile, 'utf8'));
        }
        return { sessions: [] };
    }

    saveSessions(data) {
        fs.writeFileSync(this.sessionsFile, JSON.stringify(data, null, 2));
    }

    startSession(sessionData) {
        const data = this.loadSessions();
        const session = {
            id: Date.now().toString(),
            startTime: new Date().toISOString(),
            endTime: null,
            duration: 0,
            proposalsSent: 0,
            revenueActions: 0,
            codeShipped: 0,
            filesModified: 0,
            qualityGatesPassed: 0,
            revenueGateSatisfied: false,
            status: 'active',
            ...sessionData
        };

        data.sessions.push(session);
        this.saveSessions(data);
        return session;
    }

    endSession(sessionId, summary) {
        const data = this.loadSessions();
        const session = data.sessions.find(s => s.id === sessionId);
        if (!session) throw new Error('Session not found');

        session.endTime = new Date().toISOString();
        session.duration = (new Date(session.endTime) - new Date(session.startTime)) / 1000 / 60; // minutes
        session.status = 'completed';
        Object.assign(session, summary);

        this.saveSessions(data);
        return session;
    }

    recordAction(sessionId, actionType, details) {
        const data = this.loadSessions();
        const session = data.sessions.find(s => s.id === sessionId);
        if (!session) throw new Error('Session not found');

        if (actionType === 'proposal-sent') session.proposalsSent += 1;
        if (actionType === 'revenue-action') session.revenueActions += 1;
        if (actionType === 'code-shipped') session.codeShipped += 1;
        if (actionType === 'file-modified') session.filesModified += 1;
        if (actionType === 'gate-passed') session.qualityGatesPassed += 1;

        if (!session.actions) session.actions = [];
        session.actions.push({
            type: actionType,
            timestamp: new Date().toISOString(),
            ...details
        });

        this.saveSessions(data);
    }

    checkAccountability() {
        const data = this.loadSessions();
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const recentSessions = data.sessions.filter(s =>
            new Date(s.startTime) >= sevenDaysAgo
        );

        const totalProposals = recentSessions.reduce((sum, s) => sum + (s.proposalsSent || 0), 0);

        return {
            triggered: totalProposals === 0,
            totalProposalsLast7Days: totalProposals,
            sessionsLast7Days: recentSessions.length,
            message: totalProposals === 0
                ? '⚠️  ACCOUNTABILITY TRIGGER: Zero proposals sent in 7 days. All non-revenue tasks BLOCKED until outreach begins.'
                : `✓ ${totalProposals} proposals sent in last 7 days. All systems operational.`
        };
    }

    generateWeeklyReport() {
        const data = this.loadSessions();
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const weekSessions = data.sessions.filter(s =>
            new Date(s.startTime) >= weekAgo && s.status === 'completed'
        );

        const totals = weekSessions.reduce((acc, s) => {
            acc.proposalsSent += s.proposalsSent || 0;
            acc.revenueActions += s.revenueActions || 0;
            acc.codeShipped += s.codeShipped || 0;
            acc.filesModified += s.filesModified || 0;
            acc.qualityGatesPassed += s.qualityGatesPassed || 0;
            acc.totalTime += s.duration || 0;
            return acc;
        }, { proposalsSent: 0, revenueActions: 0, codeShipped: 0, filesModified: 0, qualityGatesPassed: 0, totalTime: 0 });

        return {
            weekStart: weekAgo.toISOString(),
            weekEnd: now.toISOString(),
            sessionsCompleted: weekSessions.length,
            ...totals,
            averageSessionTime: weekSessions.length > 0 ? (totals.totalTime / weekSessions.length).toFixed(0) : 0,
            accountability: this.checkAccountability()
        };
    }

    generateSessionLog() {
        const data = this.loadSessions();
        const now = new Date();
        const today = now.toDateString();

        const todaySessions = data.sessions.filter(s =>
            new Date(s.startTime).toDateString() === today
        );

        let log = `# SESSION LOG - ${now.toLocaleDateString()}\n\n`;
        log += `Generated: ${now.toISOString()}\n\n`;

        if (todaySessions.length === 0) {
            log += `No sessions recorded today.\n\n`;
        } else {
            log += `## Today's Sessions (${todaySessions.length})\n\n`;
            todaySessions.forEach((s, i) => {
                log += `### Session ${i + 1} - ${s.id}\n`;
                log += `- Start: ${new Date(s.startTime).toLocaleTimeString()}\n`;
                log += `- End: ${s.endTime ? new Date(s.endTime).toLocaleTimeString() : 'In Progress'}\n`;
                log += `- Duration: ${s.duration ? s.duration.toFixed(0) : '—'} minutes\n`;
                log += `- Proposals Sent: ${s.proposalsSent || 0}\n`;
                log += `- Revenue Actions: ${s.revenueActions || 0}\n`;
                log += `- Code Shipped: ${s.codeShipped || 0}\n`;
                log += `- Files Modified: ${s.filesModified || 0}\n`;
                log += `- Quality Gates Passed: ${s.qualityGatesPassed || 0}\n`;
                log += `- Status: ${s.status}\n\n`;
            });
        }

        // Add accountability check
        const accountability = this.checkAccountability();
        log += `## Accountability Status\n\n`;
        log += `${accountability.message}\n\n`;
        log += `- Proposals last 7 days: ${accountability.totalProposalsLast7Days}\n`;
        log += `- Sessions last 7 days: ${accountability.sessionsLast7Days}\n\n`;

        // Add weekly summary
        const weekly = this.generateWeeklyReport();
        log += `## Weekly Summary (Last 7 Days)\n\n`;
        log += `- Sessions Completed: ${weekly.sessionsCompleted}\n`;
        log += `- Total Proposals: ${weekly.proposalsSent}\n`;
        log += `- Total Revenue Actions: ${weekly.revenueActions}\n`;
        log += `- Code Shipped: ${weekly.codeShipped}\n`;
        log += `- Files Modified: ${weekly.filesModified}\n`;
        log += `- Quality Gates Passed: ${weekly.qualityGatesPassed}\n`;
        log += `- Average Session Time: ${weekly.averageSessionTime} minutes\n`;

        const outputPath = path.join(__dirname, '..', 'Logs', `session-${now.toISOString().split('T')[0]}.md`);
        const logsDir = path.dirname(outputPath);
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }
        fs.writeFileSync(outputPath, log);
        return outputPath;
    }
}

if (require.main === module) {
    const tracker = new SessionTracker();
    const command = process.argv[2];

    switch (command) {
        case 'start':
            const session = tracker.startSession({});
            console.log('✓ Session started:', session.id);
            break;
        case 'end':
            const ended = tracker.endSession(process.argv[3], {});
            console.log('✓ Session ended');
            break;
        case 'check':
            const accountability = tracker.checkAccountability();
            console.log(accountability.message);
            break;
        case 'weekly':
            const weekly = tracker.generateWeeklyReport();
            console.log(JSON.stringify(weekly, null, 2));
            break;
        case 'log':
            const logPath = tracker.generateSessionLog();
            console.log('✓ Session log generated:', logPath);
            break;
        default:
            console.log('Usage: node session-tracker.js [start|end|check|weekly|log]');
    }
}

module.exports = SessionTracker;
