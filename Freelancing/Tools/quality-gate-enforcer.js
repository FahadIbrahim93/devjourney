// quality-gate-enforcer.js
// Automated quality gate enforcement for all deliverables
// Hope Theory - 10/10 Quality Standard

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class QualityGateEnforcer {
    constructor() {
        this.gates = [
            { name: 'Lint', command: 'npm run lint', required: true, description: 'ESLint passing' },
            { name: 'Test', command: 'npm test -- --run', required: true, description: 'All tests passing' },
            { name: 'Build', command: 'npm run build', required: true, description: 'Production build successful' },
            { name: 'TypeCheck', command: 'npm run typecheck', required: false, description: 'TypeScript compilation' },
            { name: 'Format', command: 'npm run format:check', required: false, description: 'Prettier formatting' }
        ];

        this.revenueGate = {
            name: 'Revenue Gate (Daily)',
            description: 'Outreach sent OR code shipped today',
            required: true
        };
    }

    async runGates(projectPath) {
        console.log('\n🚦 RUNNING QUALITY GATES');
        console.log('=' .repeat(60));
        console.log(`Project: ${projectPath}\n`);

        const results = {
            project: projectPath,
            timestamp: new Date().toISOString(),
            gates: [],
            passed: 0,
            failed: 0,
            total: this.gates.length + 1 // +1 for revenue gate
        };

        // Run technical gates
        for (const gate of this.gates) {
            const result = await this.runGate(gate, projectPath);
            results.gates.push(result);
            if (result.passed) results.passed++;
            else if (gate.required) results.failed++;
        }

        // Run revenue gate
        const revenueResult = await this.checkRevenueGate(projectPath);
        results.gates.push(revenueResult);
        if (revenueResult.passed) results.passed++;
        else results.failed++;

        this.printResults(results);
        return results;
    }

    async runGate(gate, projectPath) {
        const result = {
            name: gate.name,
            description: gate.description,
            required: gate.required,
            passed: false,
            output: '',
            duration: 0
        };

        try {
            const start = Date.now();
            const output = execSync(gate.command, {
                cwd: projectPath,
                encoding: 'utf8',
                stdio: 'pipe',
                timeout: 120000
            });
            result.passed = true;
            result.output = output.substring(0, 500);
            result.duration = Date.now() - start;
        } catch (error) {
            result.passed = false;
            result.output = (error.stdout || error.message || '').substring(0, 500);
            result.duration = 0;
        }

        return result;
    }

    async checkRevenueGate(projectPath) {
        const result = {
            name: this.revenueGate.name,
            description: this.revenueGate.description,
            required: this.revenueGate.required,
            passed: false,
            output: '',
            details: {}
        };

        // Check if outreach was sent today
        const outreachTracker = path.join(__dirname, 'data', 'outreach-log.json');
        let proposalsSentToday = 0;

        if (fs.existsSync(outreachTracker)) {
            const log = JSON.parse(fs.readFileSync(outreachTracker, 'utf8'));
            const today = new Date().toDateString();
            proposalsSentToday = (log.entries || []).filter(e =>
                new Date(e.date).toDateString() === today
            ).length;
        }

        // Check if code was shipped today (git commits)
        let codeShippedToday = false;
        try {
            const gitLog = execSync('git log --since="midnight" --oneline', {
                cwd: projectPath,
                encoding: 'utf8',
                stdio: 'pipe'
            });
            codeShippedToday = gitLog.trim().length > 0;
        } catch (e) {
            // No git repo or no commits
        }

        result.passed = proposalsSentToday > 0 || codeShippedToday;
        result.details = {
            proposalsSentToday,
            codeShippedToday
        };
        result.output = result.passed
            ? `✓ ${proposalsSentToday} proposals sent OR code shipped today`
            : '✗ No proposals sent and no code shipped today';

        return result;
    }

    printResults(results) {
        console.log('\n📊 RESULTS');
        console.log('=' .repeat(60));

        for (const gate of results.gates) {
            const icon = gate.passed ? '✅' : (gate.required ? '❌' : '⚠️');
            const status = gate.passed ? 'PASS' : (gate.required ? 'FAIL' : 'SKIP');
            console.log(`${icon} ${gate.name.padEnd(20)} [${status}]`);
            if (gate.duration) {
                console.log(`   Duration: ${gate.duration}ms`);
            }
            if (!gate.passed && gate.required) {
                console.log(`   Output: ${gate.output.substring(0, 200)}`);
            }
        }

        console.log('\n' + '=' .repeat(60));
        const score = `${results.passed}/${results.total}`;
        const percentage = (results.passed / results.total * 100).toFixed(0);
        console.log(`SCORE: ${score} (${percentage}%)`);

        if (results.failed === 0) {
            console.log('🎉 ALL REQUIRED GATES PASSED — Ready to ship!');
        } else {
            console.log(`⚠️  ${results.failed} required gate(s) failed — Fix before delivery.`);
        }
    }

    generateComplianceReport(projectPath) {
        const reportPath = path.join(projectPath, 'QUALITY_GATE_REPORT.md');
        const timestamp = new Date().toISOString();

        const content = `# Quality Gate Compliance Report

**Generated:** ${timestamp}
**Project:** ${projectPath}
**Standard:** Hope Theory 10/10 Quality

---

## Gate Definitions

| Gate | Command | Required | Purpose |
|------|---------|----------|---------|
${this.gates.map(g => `| ${g.name} | \`${g.command}\` | ${g.required ? '✅' : '❌'} | ${g.description} |`).join('\n')}
| ${this.revenueGate.name} | Manual | ✅ | ${this.revenueGate.description} |

## Execution Instructions

### Run All Gates
\`\`\`bash
node quality-gate-enforcer.js
\`\`\`

### Individual Gates
\`\`\`bash
npm run lint          # Gate 1: Lint
npm test -- --run     # Gate 2: Tests
npm run build         # Gate 3: Build
npm run typecheck     # Gate 4: TypeScript (optional)
\`\`\`

### Revenue Gate
Must satisfy ONE of:
- Send at least 1 freelance proposal today
- Ship at least 1 commit/feature today

## Failure Protocols

If any REQUIRED gate fails:
1. **STOP** — Do not present work as complete
2. **FIX** — Address the specific failure
3. **RE-RUN** — Verify all gates pass
4. **DELIVER** — Only after 100% pass rate

## Quality Standards

- **10/10 (Ship-ready):** All required gates pass + revenue gate satisfied
- **9/10 (Production-ready):** All required gates pass
- **8/10 (Acceptable):** 1-2 optional gates may fail
- **Below 8/10:** Do NOT deliver to client

---

*Maintained by Hope Theory Quality System*
`;

        fs.writeFileSync(reportPath, content);
        return reportPath;
    }
}

if (require.main === module) {
    const enforcer = new QualityGateEnforcer();
    const command = process.argv[2] || 'run';
    const projectPath = process.argv[3] || process.cwd();

    switch (command) {
        case 'run':
            enforcer.runGates(projectPath);
            break;
        case 'report':
            const reportPath = enforcer.generateComplianceReport(projectPath);
            console.log('✓ Quality gate report generated:', reportPath);
            break;
        default:
            console.log('Usage: node quality-gate-enforcer.js [run|report] [project-path]');
    }
}

module.exports = QualityGateEnforcer;
