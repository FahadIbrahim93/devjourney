// outreach-automation.js
// Automated outreach sequences, follow-ups, and job search helpers
// Hope Theory - Revenue-First Engineering

const fs = require('fs');
const path = require('path');

class OutreachAutomation {
    constructor() {
        this.sequencesFile = path.join(__dirname, 'data', 'sequences.json');
        this.jobsFile = path.join(__dirname, 'data', 'jobs.json');
        this.ensureDataDir();
    }

    ensureDataDir() {
        const dataDir = path.join(__dirname, 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
    }

    loadJobs() {
        if (fs.existsSync(this.jobsFile)) {
            return JSON.parse(fs.readFileSync(this.jobsFile, 'utf8'));
        }
        return { jobs: [], lastSearch: null };
    }

    saveJobs(data) {
        fs.writeFileSync(this.jobsFile, JSON.stringify(data, null, 2));
    }

    addJob(jobData) {
        const data = this.loadJobs();
        const job = {
            id: Date.now().toString(),
            addedAt: new Date().toISOString(),
            status: 'new', // new, applied, replied, interviewed, won, lost
            ...jobData
        };
        data.jobs.push(job);
        this.saveJobs(data);
        return job;
    }

    updateJobStatus(jobId, status, notes = '') {
        const data = this.loadJobs();
        const job = data.jobs.find(j => j.id === jobId);
        if (!job) throw new Error('Job not found');

        job.status = status;
        job.lastUpdate = new Date().toISOString();
        if (notes) job.notes = notes;
        this.saveJobs(data);
    }

    generateFollowUpSequence(originalProposal, clientName) {
        return {
            day3: {
                subject: `Following up: ${originalProposal.subject || 'Project inquiry'}`,
                body: `Hi ${clientName},

I wanted to follow up on the proposal I sent a few days ago about ${originalProposal.project || 'your project'}.

Have you had a chance to review it? I'd be happy to:
- Jump on a quick 15-minute call to discuss details
- Provide a more detailed breakdown of the scope
- Adjust the timeline or budget to fit your needs

No pressure either way — just want to make sure you have everything you need to make a decision.

Best,
Fahad`,
                timing: 'Send 3 days after initial proposal if no reply'
            },
            day7: {
                subject: `Quick check-in: ${originalProposal.project || 'project'}`,
                body: `Hi ${clientName},

Just a quick check-in. I know you're busy, so I'll keep this short.

If you're still considering the project, I have availability starting ${this.getNextAvailableDate()}. I'd love to help you ship ${originalProposal.project || 'this project'} and get it production-ready.

If the timing isn't right or you've found someone else, no worries at all — I appreciate you considering me.

Either way, feel free to reach out anytime.

Best,
Fahad`,
                timing: 'Send 7 days after initial proposal as final follow-up'
            },
            day14: {
                subject: 'Closing the loop',
                body: `Hi ${clientName},

I'll close the loop on my end. If you're still interested in moving forward with ${originalProposal.project || 'the project'}, just reply to this email and we can pick up where we left off.

If not, I wish you the best with the project and hope we can work together in the future.

Best,
Fahad`,
                timing: 'Send 14 days after initial proposal to mark as closed'
            }
        };
    }

    getNextAvailableDate() {
        const date = new Date();
        date.setDate(date.getDate() + 3);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }

    generateSearchQueries() {
        return {
            upwork: [
                'React developer',
                'React TypeScript developer',
                'Full-stack React',
                'Next.js developer',
                'Supabase developer',
                'React bug fix',
                'React e-commerce',
                'PWA developer',
                'React migration',
                'React performance optimization'
            ],
            filters: {
                clientHistory: 'No hires yet, 1-9 hires, 10+ hires',
                budget: '$500+',
                projectLength: 'Less than 1 month, 1-3 months, 3-6 months',
                hoursPerWeek: 'Less than 30 hrs/week, 30+ hrs/week',
                paymentVerified: true
            }
        };
    }

    generateDailyOutreachPlan() {
        return {
            morning: [
                '☐ Check Upwork job feed for new React/TypeScript posts (8-9 AM)',
                '☐ Review 5-10 job postings and select best matches',
                '☐ Customize proposal for each (never copy-paste raw)',
                '☐ Send 3-5 proposals before lunch'
            ],
            afternoon: [
                '☐ Follow up on yesterday\'s proposals (if no reply)',
                '☐ Check Fiverr inbox for new orders',
                '☐ Update client tracking dashboard',
                '☐ Post gig links on LinkedIn/Twitter (2-3x/week)'
            ],
            evening: [
                '☐ Review metrics: proposals sent, reply rate, conversions',
                '☐ Plan tomorrow\'s outreach targets',
                '☐ Update portfolio site with any new work',
                '☐ Set up 3-day follow-up reminders'
            ]
        };
    }

    generateProposalCustomization(jobPosting) {
        return {
            problemIdentification: this.extractProblem(jobPosting),
            relevantProof: this.selectRelevantProof(jobPosting),
            approachSteps: this.generateApproach(jobPosting),
            riskReducers: this.getRiskReducers(jobPosting),
            nextStep: this.proposeNextStep(jobPosting)
        };
    }

    extractProblem(jobPosting) {
        const keywords = {
            auth: 'authentication and user management',
            database: 'database design and data persistence',
            ui: 'user interface and user experience',
            performance: 'app performance and optimization',
            mobile: 'mobile responsiveness and PWA support',
            ecommerce: 'e-commerce functionality and checkout flow',
            realtime: 'real-time features and live updates',
            bug: 'bug fixes and stability issues'
        };

        const text = (jobPosting.description || '').toLowerCase();
        const identified = [];

        for (const [key, phrase] of Object.entries(keywords)) {
            if (text.includes(key)) identified.push(phrase);
        }

        return identified.length > 0
            ? `You need: ${identified.slice(0, 3).join(', ')}`
            : 'You need a production-ready application that works';
    }

    selectRelevantProof(jobPosting) {
        const text = (jobPosting.description || '').toLowerCase();

        if (text.includes('ecommerce') || text.includes('shop') || text.includes('store')) {
            return 'I built RollON — a custom e-commerce app with cart, variants, and Stripe-ready checkout. Live: https://rollon-delta.vercel.app';
        }
        if (text.includes('auth') || text.includes('login') || text.includes('user')) {
            return 'I built BugSmasher with Supabase auth (email, Google OAuth, Discord OAuth) and Row Level Security. Live: https://bugsmasher-ten.vercel.app';
        }
        if (text.includes('realtime') || text.includes('live') || text.includes('sync')) {
            return 'BugSmasher features real-time leaderboards and cloud sync. Live: https://bugsmasher-ten.vercel.app';
        }
        if (text.includes('pwa') || text.includes('mobile') || text.includes('offline')) {
            return 'BugSmasher is a PWA with service worker, offline support, and installability. Live: https://bugsmasher-ten.vercel.app';
        }

        return 'I built BugSmasher — a full-stack React app with Supabase backend, production-deployed. Live: https://bugsmasher-ten.vercel.app';
    }

    generateApproach(jobPosting) {
        return [
            '1. Discovery call (15-30 min) to confirm scope and requirements',
            '2. Architecture plan and timeline (delivered within 24 hours)',
            '3. Iterative development with daily updates and code commits',
            '4. Testing, optimization, and production deployment',
            '5. Handoff with documentation and support'
        ];
    }

    getRiskReducers(jobPosting) {
        return [
            '✓ I can share a working prototype within 48 hours',
            '✓ You see the code on GitHub as I build (transparent process)',
            '✓ I communicate proactively — no surprises, no scope creep',
            '✓ Lint/test/build passing at every deliverable (10/10 quality)',
            '✓ Money-back guarantee if first milestone doesn\'t meet spec'
        ];
    }

    proposeNextStep(jobPosting) {
        return 'Let\'s jump on a 15-minute call to discuss your requirements in detail. I can also send a more detailed scope document after the call. What\'s your availability this week?';
    }

    exportOutreachPlan() {
        const plan = {
            daily: this.generateDailyOutreachPlan(),
            queries: this.generateSearchQueries(),
            followUpSequences: {
                description: 'Auto-generated 3-touch follow-up sequence for any proposal',
                example: this.generateFollowUpSequence({ project: 'React dashboard' }, 'Client Name')
            }
        };

        const outputPath = path.join(__dirname, '..', 'OUTREACH_AUTOMATION_PLAN.md');
        let content = '# OUTREACH AUTOMATION PLAN\n\n';
        content += `Generated: ${new Date().toISOString()}\n\n`;
        content += '## Daily Routine\n\n';
        content += '### Morning\n';
        plan.daily.morning.forEach(item => content += `- ${item}\n`);
        content += '\n### Afternoon\n';
        plan.daily.afternoon.forEach(item => content += `- ${item}\n`);
        content += '\n### Evening\n';
        plan.daily.evening.forEach(item => content += `- ${item}\n`);

        content += '\n## Upwork Search Queries\n\n';
        plan.queries.upwork.forEach(q => content += `- \`${q}\`\n`);

        content += '\n## Recommended Filters\n\n';
        content += '```json\n' + JSON.stringify(plan.queries.filters, null, 2) + '\n```\n';

        content += '\n## Follow-Up Sequences\n\n';
        content += '### Day 3 Follow-Up\n\n';
        content += `**Subject:** ${plan.followUpSequences.example.day3.subject}\n\n`;
        content += `${plan.followUpSequences.example.day3.body}\n\n`;

        content += '### Day 7 Follow-Up\n\n';
        content += `**Subject:** ${plan.followUpSequences.example.day7.subject}\n\n`;
        content += `${plan.followUpSequences.example.day7.body}\n\n`;

        content += '### Day 14 Follow-Up (Close)\n\n';
        content += `**Subject:** ${plan.followUpSequences.example.day14.subject}\n\n`;
        content += `${plan.followUpSequences.example.day14.body}\n\n`;

        fs.writeFileSync(outputPath, content);
        return outputPath;
    }
}

if (require.main === module) {
    const automation = new OutreachAutomation();
    const command = process.argv[2];

    switch (command) {
        case 'plan':
            const planPath = automation.exportOutreachPlan();
            console.log('✓ Outreach plan exported:', planPath);
            break;
        case 'followup':
            const seq = automation.generateFollowUpSequence(
                { project: process.argv[3] || 'React project' },
                process.argv[4] || 'there'
            );
            console.log(JSON.stringify(seq, null, 2));
            break;
        default:
            console.log('Usage: node outreach-automation.js <plan|followup>');
    }
}

module.exports = OutreachAutomation;
