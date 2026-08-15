// revenue-dashboard.js
// Real-time revenue tracking and analytics dashboard
// Hope Theory - Revenue-First Engineering

const fs = require('fs');
const path = require('path');
const ClientTracker = require('./client-tracker.js');

class RevenueDashboard {
    constructor() {
        this.tracker = new ClientTracker();
        this.dashboardFile = path.join(__dirname, 'data', 'dashboard-data.json');
    }

    calculateMetrics() {
        const data = this.tracker.loadData();
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfYear = new Date(now.getFullYear(), 0, 1);

        // Monthly revenue
        const monthlyRevenue = data.clients
            .filter(c => c.completedDate && new Date(c.completedDate) >= startOfMonth)
            .reduce((sum, c) => sum + (c.revenue || 0), 0);

        // Yearly revenue
        const yearlyRevenue = data.clients
            .filter(c => c.completedDate && new Date(c.completedDate) >= startOfYear)
            .reduce((sum, c) => sum + (c.revenue || 0), 0);

        // Pending revenue (active + contract signed)
        const pendingRevenue = data.clients
            .filter(c => c.status === 'active' || c.status === 'contractSigned')
            .reduce((sum, c) => sum + (c.contract?.value || 0), 0);

        // Pipeline value
        const pipelineValue = data.clients
            .filter(c => ['lead', 'proposalSent', 'negotiating'].includes(c.status))
            .reduce((sum, c) => sum + (parseInt(c.budget) || 0), 0);

        // Goals
        const monthlyGoal = 5000; // $5K/month target
        const yearlyGoal = 60000; // $60K/year target

        return {
            revenue: {
                monthly: monthlyRevenue,
                yearly: yearlyRevenue,
                pending: pendingRevenue,
                pipeline: pipelineValue,
                lifetime: data.metrics.totalRevenue
            },
            goals: {
                monthly: { current: monthlyRevenue, target: monthlyGoal, percent: (monthlyRevenue / monthlyGoal * 100).toFixed(1) },
                yearly: { current: yearlyRevenue, target: yearlyGoal, percent: (yearlyRevenue / yearlyGoal * 100).toFixed(1) }
            },
            activity: {
                proposalsSent: data.metrics.totalProposalsSent,
                replies: data.metrics.totalReplies,
                interviews: data.metrics.totalInterviews,
                contracts: data.metrics.totalContracts,
                replyRate: data.metrics.replyRate,
                conversionRate: data.metrics.conversionRate
            },
            timestamp: new Date().toISOString()
        };
    }

    generateHTML() {
        const metrics = this.calculateMetrics();
        const data = this.tracker.loadData();

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Revenue Dashboard - Hope Theory</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #fff; padding: 24px; }
        .container { max-width: 1400px; margin: 0 auto; }
        h1 { font-size: 2rem; margin-bottom: 8px; }
        .subtitle { color: #888; margin-bottom: 32px; font-size: 0.9rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .card { background: #141414; border: 1px solid #2a2a2a; border-radius: 12px; padding: 24px; }
        .card-title { font-size: 0.85rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
        .card-value { font-size: 2.5rem; font-weight: 800; color: #00d9ff; font-family: 'JetBrains Mono', monospace; }
        .card-sub { color: #666; font-size: 0.9rem; margin-top: 4px; }
        .progress-bar { background: #1a1a1a; height: 8px; border-radius: 4px; overflow: hidden; margin-top: 12px; }
        .progress-fill { background: linear-gradient(90deg, #00d9ff, #00ff88); height: 100%; transition: width 0.3s; }
        .section-title { font-size: 1.3rem; margin: 32px 0 16px; }
        table { width: 100%; border-collapse: collapse; background: #141414; border-radius: 12px; overflow: hidden; }
        th, td { padding: 12px 16px; text-align: left; border-bottom: 1px solid #2a2a2a; }
        th { background: #1a1a1a; color: #888; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; }
        tr:hover { background: #1a1a1a; }
        .status { display: inline-block; padding: 4px 10px; border-radius: 100px; font-size: 0.75rem; font-weight: 500; }
        .status-active { background: rgba(0, 255, 136, 0.1); color: #00ff88; }
        .status-pending { background: rgba(255, 170, 0, 0.1); color: #ffaa00; }
        .status-completed { background: rgba(0, 217, 255, 0.1); color: #00d9ff; }
        .alert { background: rgba(255, 68, 68, 0.1); border: 1px solid rgba(255, 68, 68, 0.3); color: #ff4444; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>💰 Revenue Dashboard</h1>
        <p class="subtitle">Last updated: ${new Date(metrics.timestamp).toLocaleString()}</p>

        ${metrics.activity.proposalsSent === 0 ? `
        <div class="alert">
            ⚠️ <strong>Accountability Alert:</strong> No proposals sent yet. Send your first proposal today to unblock revenue work.
        </div>
        ` : ''}

        <div class="grid">
            <div class="card">
                <div class="card-title">Monthly Revenue</div>
                <div class="card-value">$${metrics.revenue.monthly.toLocaleString()}</div>
                <div class="card-sub">Goal: $${metrics.goals.monthly.target.toLocaleString()} (${metrics.goals.monthly.percent}%)</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(metrics.goals.monthly.percent, 100)}%"></div>
                </div>
            </div>
            <div class="card">
                <div class="card-title">Yearly Revenue</div>
                <div class="card-value">$${metrics.revenue.yearly.toLocaleString()}</div>
                <div class="card-sub">Goal: $${metrics.goals.yearly.target.toLocaleString()} (${metrics.goals.yearly.percent}%)</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(metrics.goals.yearly.percent, 100)}%"></div>
                </div>
            </div>
            <div class="card">
                <div class="card-title">Pending Revenue</div>
                <div class="card-value">$${metrics.revenue.pending.toLocaleString()}</div>
                <div class="card-sub">Active + contract signed</div>
            </div>
            <div class="card">
                <div class="card-title">Pipeline Value</div>
                <div class="card-value">$${metrics.revenue.pipeline.toLocaleString()}</div>
                <div class="card-sub">All active leads</div>
            </div>
        </div>

        <h2 class="section-title">📊 Activity Metrics</h2>
        <div class="grid">
            <div class="card">
                <div class="card-title">Proposals Sent</div>
                <div class="card-value">${metrics.activity.proposalsSent}</div>
            </div>
            <div class="card">
                <div class="card-title">Replies</div>
                <div class="card-value">${metrics.activity.replies}</div>
                <div class="card-sub">${metrics.activity.replyRate}% reply rate</div>
            </div>
            <div class="card">
                <div class="card-title">Interviews</div>
                <div class="card-value">${metrics.activity.interviews}</div>
            </div>
            <div class="card">
                <div class="card-title">Contracts</div>
                <div class="card-value">${metrics.activity.contracts}</div>
                <div class="card-sub">${metrics.activity.conversionRate}% conversion</div>
            </div>
        </div>

        <h2 class="section-title">👥 Client Pipeline</h2>
        <table>
            <thead>
                <tr>
                    <th>Client</th>
                    <th>Platform</th>
                    <th>Type</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Last Activity</th>
                </tr>
            </thead>
            <tbody>
                ${data.clients.slice(0, 20).map(client => `
                <tr>
                    <td>${client.name || 'Anonymous'}</td>
                    <td>${client.platform || '—'}</td>
                    <td>${client.projectType || '—'}</td>
                    <td>$${client.budget || 'TBD'}</td>
                    <td><span class="status status-${client.status === 'active' ? 'active' : client.status === 'completed' ? 'completed' : 'pending'}">${client.status}</span></td>
                    <td>${client.lastProposalDate ? new Date(client.lastProposalDate).toLocaleDateString() : new Date(client.createdAt).toLocaleDateString()}</td>
                </tr>
                `).join('')}
                ${data.clients.length === 0 ? '<tr><td colspan="6" style="text-align: center; color: #666; padding: 32px;">No clients yet. Add your first prospect to start tracking.</td></tr>' : ''}
            </tbody>
        </table>
    </div>
</body>
</html>`;

        const outputPath = path.join(__dirname, '..', 'Revenue_Dashboard.html');
        fs.writeFileSync(outputPath, html);
        return outputPath;
    }

    exportJSON() {
        const metrics = this.calculateMetrics();
        const outputPath = path.join(__dirname, 'data', 'metrics-export.json');
        fs.writeFileSync(outputPath, JSON.stringify(metrics, null, 2));
        return outputPath;
    }
}

// CLI interface
if (require.main === module) {
    const dashboard = new RevenueDashboard();

    const command = process.argv[2] || 'html';
    switch (command) {
        case 'html':
            const htmlPath = dashboard.generateHTML();
            console.log('✓ Dashboard HTML generated:', htmlPath);
            break;
        case 'json':
            const jsonPath = dashboard.exportJSON();
            console.log('✓ Metrics JSON exported:', jsonPath);
            break;
        case 'metrics':
            const metrics = dashboard.calculateMetrics();
            console.log(JSON.stringify(metrics, null, 2));
            break;
        default:
            console.log('Usage: node revenue-dashboard.js [html|json|metrics]');
    }
}

module.exports = RevenueDashboard;
