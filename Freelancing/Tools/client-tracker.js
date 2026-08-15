// client-tracker.js
// Automated client pipeline and revenue tracking system
// Hope Theory - Revenue-First Engineering

const fs = require('fs');
const path = require('path');

class ClientTracker {
    constructor() {
        this.dataFile = path.join(__dirname, 'data', 'clients.json');
        this.pipelineFile = path.join(__dirname, 'data', 'pipeline.json');
        this.revenueFile = path.join(__dirname, 'data', 'revenue.json');
        this.ensureDataDir();
    }

    ensureDataDir() {
        const dataDir = path.join(__dirname, 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
    }

    loadData() {
        const defaultData = {
            clients: [],
            pipeline: {
                lead: [],
                proposalSent: [],
                negotiating: [],
                contractSigned: [],
                active: [],
                completed: []
            },
            metrics: {
                totalProposalsSent: 0,
                totalReplies: 0,
                totalInterviews: 0,
                totalContracts: 0,
                totalRevenue: 0,
                replyRate: 0,
                conversionRate: 0
            }
        };

        if (fs.existsSync(this.dataFile)) {
            return JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
        }
        return defaultData;
    }

    saveData(data) {
        fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
    }

    addProspect(prospect) {
        const data = this.loadData();
        const prospectRecord = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            status: 'lead',
            proposalsSent: 0,
            replies: 0,
            interviews: 0,
            ...prospect
        };

        data.clients.push(prospectRecord);
        data.pipeline.lead.push(prospectRecord.id);
        this.saveData(data);

        return prospectRecord;
    }

    recordProposalSent(prospectId, proposalData) {
        const data = this.loadData();
        const client = data.clients.find(c => c.id === prospectId);
        if (!client) throw new Error('Client not found');

        client.proposalsSent += 1;
        client.lastProposalDate = new Date().toISOString();
        client.lastProposal = proposalData;
        data.metrics.totalProposalsSent += 1;

        // Move to proposalSent stage if still in lead
        if (client.status === 'lead') {
            client.status = 'proposalSent';
            data.pipeline.lead = data.pipeline.lead.filter(id => id !== prospectId);
            data.pipeline.proposalSent.push(prospectId);
        }

        this.saveData(data);
        this.updateMetrics();
    }

    recordReply(prospectId, replyData) {
        const data = this.loadData();
        const client = data.clients.find(c => c.id === prospectId);
        if (!client) throw new Error('Client not found');

        client.replies += 1;
        client.lastReply = { ...replyData, date: new Date().toISOString() };
        data.metrics.totalReplies += 1;

        this.saveData(data);
        this.updateMetrics();
    }

    recordInterview(prospectId) {
        const data = this.loadData();
        const client = data.clients.find(c => c.id === prospectId);
        if (!client) throw new Error('Client not found');

        client.interviews += 1;
        client.status = 'negotiating';
        data.metrics.totalInterviews += 1;

        // Move pipeline
        data.pipeline.proposalSent = data.pipeline.proposalSent.filter(id => id !== prospectId);
        data.pipeline.negotiating.push(prospectId);

        this.saveData(data);
        this.updateMetrics();
    }

    recordContract(prospectId, contractData) {
        const data = this.loadData();
        const client = data.clients.find(c => c.id === prospectId);
        if (!client) throw new Error('Client not found');

        client.status = 'contractSigned';
        client.contract = { ...contractData, signedDate: new Date().toISOString() };
        data.metrics.totalContracts += 1;

        data.pipeline.negotiating = data.pipeline.negotiating.filter(id => id !== prospectId);
        data.pipeline.contractSigned.push(prospectId);

        this.saveData(data);
        this.updateMetrics();
    }

    startProject(prospectId) {
        const data = this.loadData();
        const client = data.clients.find(c => c.id === prospectId);
        if (!client) throw new Error('Client not found');

        client.status = 'active';
        client.startDate = new Date().toISOString();

        data.pipeline.contractSigned = data.pipeline.contractSigned.filter(id => id !== prospectId);
        data.pipeline.active.push(prospectId);

        this.saveData(data);
    }

    completeProject(prospectId, revenue, satisfaction) {
        const data = this.loadData();
        const client = data.clients.find(c => c.id === prospectId);
        if (!client) throw new Error('Client not found');

        client.status = 'completed';
        client.completedDate = new Date().toISOString();
        client.revenue = revenue;
        client.satisfaction = satisfaction;
        data.metrics.totalRevenue += revenue;

        data.pipeline.active = data.pipeline.active.filter(id => id !== prospectId);
        data.pipeline.completed.push(prospectId);

        this.saveData(data);
        this.updateMetrics();
    }

    updateMetrics() {
        const data = this.loadData();
        const { totalProposalsSent, totalReplies, totalInterviews, totalContracts } = data.metrics;

        data.metrics.replyRate = totalProposalsSent > 0 ? (totalReplies / totalProposalsSent * 100).toFixed(1) : 0;
        data.metrics.conversionRate = totalProposalsSent > 0 ? (totalContracts / totalProposalsSent * 100).toFixed(1) : 0;

        this.saveData(data);
    }

    getDashboard() {
        const data = this.loadData();
        const { pipeline, metrics } = data;

        return {
            summary: {
                activeClients: pipeline.active.length,
                pendingProposals: pipeline.proposalSent.length,
                negotiating: pipeline.negotiating.length,
                completedProjects: pipeline.completed.length
            },
            metrics,
            recentActivity: data.clients
                .sort((a, b) => new Date(b.lastProposalDate || b.createdAt) - new Date(a.lastProposalDate || a.createdAt))
                .slice(0, 10)
        };
    }

    generateReport() {
        const data = this.loadData();
        const dashboard = this.getDashboard();
        const monthRevenue = data.clients
            .filter(c => c.completedDate && new Date(c.completedDate).getMonth() === new Date().getMonth())
            .reduce((sum, c) => sum + (c.revenue || 0), 0);

        return {
            generatedAt: new Date().toISOString(),
            ...dashboard,
            monthlyRevenue: monthRevenue,
            yearlyTarget: 60000,
            yearlyProgress: (metrics => metrics.totalRevenue / 60000 * 100)(data.metrics)
        };
    }
}

// CLI interface
if (require.main === module) {
    const tracker = new ClientTracker();
    const command = process.argv[2];

    switch (command) {
        case 'add':
            const prospect = {
                name: process.argv[3],
                platform: process.argv[4] || 'upwork',
                projectType: process.argv[5] || 'react',
                budget: process.argv[6] || 'TBD',
                contact: process.argv[7] || ''
            };
            const added = tracker.addProspect(prospect);
            console.log('✓ Added prospect:', added);
            break;

        case 'proposal':
            tracker.recordProposalSent(process.argv[3], { sentAt: new Date().toISOString() });
            console.log('✓ Recorded proposal sent');
            break;

        case 'reply':
            tracker.recordReply(process.argv[3], { type: process.argv[4] || 'message' });
            console.log('✓ Recorded reply');
            break;

        case 'interview':
            tracker.recordInterview(process.argv[3]);
            console.log('✓ Recorded interview');
            break;

        case 'contract':
            tracker.recordContract(process.argv[3], { value: process.argv[4] });
            console.log('✓ Recorded contract');
            break;

        case 'complete':
            tracker.completeProject(process.argv[3], parseInt(process.argv[4]), process.argv[5] || 5);
            console.log('✓ Project completed');
            break;

        case 'dashboard':
            const dashboard = tracker.getDashboard();
            console.log('\n=== FREELANCE DASHBOARD ===\n');
            console.log(JSON.stringify(dashboard, null, 2));
            break;

        case 'report':
            const report = tracker.generateReport();
            console.log('\n=== MONTHLY REPORT ===\n');
            console.log(JSON.stringify(report, null, 2));
            break;

        default:
            console.log('Usage: node client-tracker.js <command> [args]');
            console.log('Commands:');
            console.log('  add <name> <platform> <type> <budget> <contact>');
            console.log('  proposal <id>');
            console.log('  reply <id> [type]');
            console.log('  interview <id>');
            console.log('  contract <id> <value>');
            console.log('  complete <id> <revenue> [rating]');
            console.log('  dashboard');
            console.log('  report');
    }
}

module.exports = ClientTracker;
