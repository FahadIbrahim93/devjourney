// freelance-orchestrator.js
// Master orchestration script - ties all freelance systems together
// Hope Theory - Revenue-First Engineering

const fs = require('fs');
const path = require('path');
const ProposalGenerator = require('./proposal-generator.js');
const ClientTracker = require('./client-tracker.js');
const RevenueDashboard = require('./revenue-dashboard.js');
const OutreachAutomation = require('./outreach-automation.js');
const QualityGateEnforcer = require('./quality-gate-enforcer.js');
const ClientOnboarding = require('./client-onboarding.js');
const FollowUpAutomation = require('./followup-automation.js');

class FreelanceOrchestrator {
    constructor() {
        this.proposalGen = new ProposalGenerator();
        this.tracker = new ClientTracker();
        this.dashboard = new RevenueDashboard();
        this.outreach = new OutreachAutomation();
        this.quality = new QualityGateEnforcer();
        this.onboarding = new ClientOnboarding();
        this.followup = new FollowUpAutomation();
    }

    async initialize() {
        console.log('\n🚀 HOPE THEORY FREELANCE ORCHESTRATOR');
        console.log('=' .repeat(60));
        console.log('Initializing all systems...\n');

        const results = {
            timestamp: new Date().toISOString(),
            systems: []
        };

        // 1. Generate outreach plan
        const outreachPlan = this.outreach.exportOutreachPlan();
        results.systems.push({ name: 'Outreach Plan', status: '✅', path: outreachPlan });

        // 2. Generate follow-up schedule
        const followupSchedule = this.followup.generateFollowUpSchedule();
        results.systems.push({ name: 'Follow-up Schedule', status: '✅', path: followupSchedule });

        // 3. Export onboarding templates
        const onboardingTemplates = this.onboarding.exportAllTemplates();
        results.systems.push({ name: 'Onboarding Templates', status: '✅', path: onboardingTemplates });

        // 4. Export follow-up templates
        const followupTemplates = this.followup.exportAllTemplates();
        results.systems.push({ name: 'Follow-up Templates', status: '✅', path: followupTemplates });

        // 5. Generate initial dashboard
        const dashboardPath = this.dashboard.generateHTML();
        results.systems.push({ name: 'Revenue Dashboard', status: '✅', path: dashboardPath });

        // 6. Export JSON metrics
        const metricsPath = this.dashboard.exportJSON();
        results.systems.push({ name: 'Metrics Export', status: '✅', path: metricsPath });

        // 7. Generate sample proposals for first day
        const sampleProposals = this.generateFirstDayProposals();
        results.systems.push({ name: 'Sample Proposals', status: '✅', count: sampleProposals.length });

        this.printInitializationReport(results);
        return results;
    }

    generateFirstDayProposals() {
        const proposalTypes = ['react', 'fullstack', 'ecommerce', 'pwa', 'bugfix'];
        const proposals = [];

        proposalTypes.forEach(type => {
            try {
                const result = this.proposalGen.generate({
                    type,
                    specificRequirement: `[First ${type} project - personalize before sending]`,
                    problemSummary: `[Client needs a production-ready ${type} solution]`
                });
                const filename = `first-day-${type}-${Date.now()}.md`;
                const filepath = this.proposalGen.saveProposal(result, filename);
                proposals.push({ type, path: filepath });
            } catch (e) {
                console.error(`Error generating ${type} proposal:`, e.message);
            }
        });

        return proposals;
    }

    printInitializationReport(results) {
        console.log('\n📊 INITIALIZATION REPORT');
        console.log('=' .repeat(60));

        results.systems.forEach(system => {
            console.log(`${system.status} ${system.name}`);
            if (system.path) console.log(`   → ${system.path}`);
            if (system.count) console.log(`   → ${system.count} files generated`);
        });

        console.log('\n' + '=' .repeat(60));
        console.log('✅ ALL SYSTEMS READY');
        console.log('\n📋 NEXT STEPS FOR YOU:');
        console.log('1. Create accounts on Upwork and Fiverr');
        console.log('2. Open Revenue_Dashboard.html to track progress');
        console.log('3. Send your first 5 proposals (templates in Freelancing/Profile_Setup/)');
        console.log('4. Schedule follow-ups using FollowUpAutomation');
        console.log('5. Run daily: node freelance-orchestrator.js daily');
    }

    async runDaily() {
        console.log('\n🌅 DAILY FREELANCE ROUTINE');
        console.log('=' .repeat(60));
        console.log(`Date: ${new Date().toLocaleDateString()}\n`);

        // Check pending follow-ups
        const pendingFollowups = this.followup.getPendingFollowUps();
        console.log(`📬 Pending follow-ups: ${pendingFollowups.length}`);
        if (pendingFollowups.length > 0) {
            pendingFollowups.forEach(f => {
                console.log(`   - ${f.type} (${f.prospectId})`);
            });
        }

        // Show dashboard summary
        const dashboard = this.dashboard.calculateMetrics();
        console.log('\n💰 REVENUE STATUS:');
        console.log(`   Monthly: $${dashboard.revenue.monthly} / $${dashboard.goals.monthly.target} (${dashboard.goals.monthly.percent}%)`);
        console.log(`   Proposals Sent: ${dashboard.activity.proposalsSent}`);
        console.log(`   Reply Rate: ${dashboard.activity.replyRate}%`);

        // Show daily targets
        console.log('\n🎯 DAILY TARGETS:');
        console.log('   [ ] Send 3-5 personalized proposals');
        console.log('   [ ] Respond to any client messages within 1 hour');
        console.log('   [ ] Update client tracking dashboard');
        console.log('   [ ] Post on social media (2-3x/week)');
        console.log('   [ ] Check for and send pending follow-ups');

        // Check accountability
        if (dashboard.activity.proposalsSent === 0) {
            console.log('\n⚠️  ACCOUNTABILITY ALERT:');
            console.log('   No proposals sent yet. Send at least 1 today.');
        }

        console.log('\n' + '=' .repeat(60));
    }

    async runWeekly() {
        console.log('\n📅 WEEKLY FREELANCE REVIEW');
        console.log('=' .repeat(60));

        const metrics = this.dashboard.calculateMetrics();
        const report = this.dashboard.generateHTML();

        console.log('\n📊 THIS WEEK\'S METRICS:');
        console.log(`   Proposals Sent: ${metrics.activity.proposalsSent}`);
        console.log(`   Replies: ${metrics.activity.replies} (${metrics.activity.replyRate}%)`);
        console.log(`   Interviews: ${metrics.activity.interviews}`);
        console.log(`   Contracts: ${metrics.activity.contracts}`);
        console.log(`   Revenue: $${metrics.revenue.monthly} this month`);

        console.log('\n🎯 NEXT WEEK\'S FOCUS:');
        if (metrics.activity.replyRate < 10) {
            console.log('   ⚠️  Reply rate below target — improve proposal personalization');
        } else if (metrics.activity.replyRate < 20) {
            console.log('   ✓ Reply rate on track — keep doing what works');
        } else {
            console.log('   🎉 Excellent reply rate — scale up outreach volume');
        }

        if (metrics.activity.proposalsSent < 15) {
            console.log('   ⚠️  Increase proposal volume — aim for 20+ per week');
        }

        console.log(`\n📄 Full report: ${report}`);
        console.log('\n' + '=' .repeat(60));
    }
}

if (require.main === module) {
    const orchestrator = new FreelanceOrchestrator();
    const command = process.argv[2] || 'init';

    (async () => {
        switch (command) {
            case 'init':
                await orchestrator.initialize();
                break;
            case 'daily':
                await orchestrator.runDaily();
                break;
            case 'weekly':
                await orchestrator.runWeekly();
                break;
            default:
                console.log('Usage: node freelance-orchestrator.js [init|daily|weekly]');
        }
    })();
}

module.exports = FreelanceOrchestrator;
