// followup-automation.js
// Automated follow-up sequences for proposals and client communication
// Hope Theory - Revenue-First Engineering

const fs = require('fs');
const path = require('path');

class FollowUpAutomation {
    constructor() {
        this.dataFile = path.join(__dirname, 'data', 'followups.json');
        this.ensureDataDir();
    }

    ensureDataDir() {
        const dataDir = path.join(__dirname, 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
    }

    loadData() {
        if (fs.existsSync(this.dataFile)) {
            return JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
        }
        return { followups: [], sequences: [] };
    }

    saveData(data) {
        fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
    }

    scheduleFollowUp(prospectData) {
        const data = this.loadData();
        const proposalDate = new Date(prospectData.proposalDate || Date.now());
        const prospectId = prospectData.prospectId || Date.now().toString();

        const followups = [
            {
                id: `${prospectId}-day3`,
                prospectId,
                type: 'day3',
                scheduledFor: this.addDays(proposalDate, 3).toISOString(),
                status: 'pending',
                template: 'day3'
            },
            {
                id: `${prospectId}-day7`,
                prospectId,
                type: 'day7',
                scheduledFor: this.addDays(proposalDate, 7).toISOString(),
                status: 'pending',
                template: 'day7'
            },
            {
                id: `${prospectId}-day14`,
                prospectId,
                type: 'day14',
                scheduledFor: this.addDays(proposalDate, 14).toISOString(),
                status: 'pending',
                template: 'day14-close'
            }
        ];

        data.followups.push(...followups);
        this.saveData(data);

        return followups;
    }

    addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    getPendingFollowUps() {
        const data = this.loadData();
        const now = new Date();
        return data.followups.filter(f =>
            f.status === 'pending' && new Date(f.scheduledFor) <= now
        );
    }

    generateFollowUpEmail(type, prospectData) {
        const templates = {
            day3: {
                subject: `Following up: ${prospectData.project || 'project inquiry'}`,
                body: `Hi ${prospectData.name || 'there'},

I wanted to follow up on the proposal I sent 3 days ago about ${prospectData.project || 'your project'}.

I understand you're probably busy, so I'll keep this short.

**A few things I can help with:**
- Jump on a 15-minute call to discuss details
- Provide a more detailed scope breakdown
- Adjust timeline or budget to fit your needs
- Share a working prototype or relevant code samples

If the timing isn't right, I completely understand. But if you're still considering the project, I'd love to hear from you.

What's the best way to move forward?

Best,
Fahad`,
                timing: '3 days after initial proposal'
            },
            day7: {
                subject: `Quick check-in — ${prospectData.project || 'project'}`,
                body: `Hi ${prospectData.name || 'there'},

Just a quick check-in. I sent a proposal about a week ago for ${prospectData.project || 'your project'}, and I wanted to see if you had any questions or if there's anything I can clarify.

**My availability:**
I have ${this.getAvailability(prospectData.timeline)} starting ${this.getStartDate()}, and I'd love to help you ship this project.

**What happens next if you're interested:**
1. Quick 15-minute call to align on scope
2. I send a detailed proposal with timeline and milestones
3. We kick off the project

If you've decided to go a different direction, no worries at all — I appreciate you considering me.

Either way, feel free to reach out anytime.

Best,
Fahad`,
                timing: '7 days after initial proposal'
            },
            'day14-close': {
                subject: 'Closing the loop',
                body: `Hi ${prospectData.name || 'there'},

I'll close the loop on my end regarding ${prospectData.project || 'the project'}.

If you're still interested in moving forward, just reply to this email and we can pick up where we left off. I'm flexible on timing.

If you've found another developer or the project's no longer a priority, I completely understand. I wish you the best with it.

**Before I go:**
If there's any feedback on why my proposal wasn't the right fit, I'd genuinely appreciate hearing it. It helps me improve for future clients.

Either way, thank you for your time and consideration. I hope we can work together in the future.

Best,
Fahad`,
                timing: '14 days after initial proposal — mark as closed'
            },
            'no-reply-30': {
                subject: `Still interested in ${prospectData.project || 'working together'}?`,
                body: `Hi ${prospectData.name || 'there'},

It's been about a month since we last connected about ${prospectData.project || 'a potential project'}.

I wanted to reach out one last time to see if you're still interested in moving forward. I have some availability opening up in the coming weeks, and I'd love to help you ship ${prospectData.project || 'your project'} if the timing is right.

If not, no worries — I hope the project is going well, and please don't hesitate to reach out if anything changes in the future.

Best,
Fahad`,
                timing: '30 days after initial proposal — long-term nurture'
            }
        };

        return templates[type] || templates.day3;
    }

    getAvailability(timeline) {
        if (timeline === 'urgent') return 'immediate availability';
        if (timeline === '1-2 weeks') return 'capacity to start this week';
        if (timeline === '1 month') return 'availability opening up soon';
        return 'availability in the coming weeks';
    }

    getStartDate() {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    }

    generateTestimonialRequest(projectData) {
        return {
            subject: `Quick favor? Would love your feedback on ${projectData.name || 'our project'}`,
            body: `Hi ${projectData.clientName || 'there'},

I hope you're doing well and enjoying ${projectData.name || 'the project we built together'}!

I have a small favor to ask: **Would you mind writing a brief testimonial about our work together?**

Here's what would be helpful (just 2-3 sentences):

1. **What was the project?** (brief context)
2. **What was the outcome?** (what I delivered)
3. **What was it like working with me?** (communication, quality, timeliness)

**You can reply to this email, or if you prefer, here's a quick template:**

> "[Client name] hired Fahad to build [project type]. He delivered [specific outcome] on time and within budget. What stood out was [communication/quality/reliability]. I would [recommend/hire again]."

If you're open to it, I'd also love to feature your project (and your company logo) on my portfolio. Just let me know.

**As a thank you**, I'd be happy to:
- Make any small tweaks or improvements to the project
- Provide priority support for the next 60 days
- Offer a referral bonus if you send me a client who closes

Thank you so much for your time. Your feedback means the world to a solo developer like me.

Best,
Fahad`,
            platformVersions: {
                upwork: 'Once written, I can help you post it on my Upwork profile for visibility.',
                fiverr: 'Your review on Fiverr helps other buyers find quality work.',
                google: 'A Google review helps local clients find me.',
                linkedin: 'A LinkedIn recommendation builds professional credibility.'
            }
        };
    }

    generateReferralRequest(happyClient) {
        return {
            subject: `Know anyone who needs a React developer?`,
            body: `Hi ${happyClient.name || 'there'},

I hope ${happyClient.project || 'the project'} is serving you well!

I'm growing my freelance practice and focusing on React/Supabase work. If you know anyone — friends, colleagues, other businesses — who might need a developer, I'd appreciate an introduction.

**What I'm looking for:**
- Small to medium businesses needing a web app
- Startups wanting to build an MVP
- E-commerce stores
- Bug fixes or performance optimization
- Any custom React/TypeScript work

**My referral offer:**
For any client you refer who signs a contract, I'll give you:
- $200 cash bonus (or PayPal/Venmo)
- OR 5 hours of free development work for you
- OR a donation to a charity of your choice ($200)

No pressure at all — just putting it out there. If someone comes to mind, just reply with their name and email, and I'll reach out personally.

Thanks for being an awesome client!

Best,
Fahad`
        };
    }

    generateReEngagementCampaign(dormantClient) {
        return {
            subject: `Checking in — any new projects on the horizon?`,
            body: `Hi ${dormantClient.name || 'there'},

It's been a while since we worked together on ${dormantClient.project || 'your project'}. I hope things are going well!

I'm reaching out because:
1. **I've added new skills** — [mention recent work/skills]
2. **I have availability** — Currently accepting new projects
3. **I value ongoing relationships** — Past clients get priority scheduling

**If you have any new projects or need updates to existing work:**
- Bug fixes and maintenance
- New features
- Performance optimization
- Tech stack upgrades

Just reply to this email and I'll get back to you within 24 hours with availability and a quote.

**If you don't have anything right now, no worries!** You can save this email for when you do need a developer. I'll be here.

Thanks for the great work we did together. Hope to collaborate again soon.

Best,
Fahad`
        };
    }

    generateFollowUpSchedule() {
        const schedule = {
            afterProposal: [
                { day: 0, action: 'Send initial proposal', priority: 'P0' },
                { day: 3, action: 'Send day 3 follow-up if no reply', priority: 'P1' },
                { day: 7, action: 'Send day 7 follow-up with availability', priority: 'P1' },
                { day: 14, action: 'Send close-loop email', priority: 'P2' },
                { day: 30, action: 'Long-term nurture email', priority: 'P3' }
            ],
            afterProjectCompletion: [
                { day: 0, action: 'Send completion email with deliverables', priority: 'P0' },
                { day: 3, action: 'Check in for any questions or issues', priority: 'P0' },
                { day: 7, action: 'Request testimonial/review', priority: 'P0' },
                { day: 30, action: 'Check in for additional work or referrals', priority: 'P1' },
                { day: 90, action: 'Re-engagement campaign', priority: 'P2' }
            ]
        };

        let output = '# FOLLOW-UP AUTOMATION SCHEDULE\n\n';
        output += `Generated: ${new Date().toISOString()}\n\n`;

        Object.entries(schedule).forEach(([phase, actions]) => {
            output += `## ${phase.replace(/([A-Z])/g, ' $1').toUpperCase()}\n\n`;
            output += '| Day | Action | Priority |\n';
            output += '|-----|--------|----------|\n';
            actions.forEach(({ day, action, priority }) => {
                output += `| +${day} | ${action} | ${priority} |\n`;
            });
            output += '\n';
        });

        output += '## DAILY ROUTINE\n\n';
        output += '### Morning (8-9 AM):\n';
        output += '1. Check for due follow-ups (pendingFollowups)\n';
        output += '2. Send any scheduled follow-ups\n';
        output += '3. Review proposals sent yesterday\n\n';
        output += '### Afternoon (1-2 PM):\n';
        output += '1. Check for replies on sent proposals\n';
        output += '2. Schedule next touchpoint for new replies\n';
        output += '3. Update CRM/pipeline status\n\n';
        output += '### Evening (6-7 PM):\n';
        output += '1. Send any time-sensitive follow-ups\n';
        output += '2. Plan tomorrow\'s outreach\n';
        output += '3. Review week\'s reply rate\n\n';

        const outputPath = path.join(__dirname, '..', 'FOLLOW_UP_SCHEDULE.md');
        fs.writeFileSync(outputPath, output);
        return outputPath;
    }

    exportAllTemplates() {
        const dir = path.join(__dirname, 'templates');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const templates = {
            'followup-day3.txt': this.generateFollowUpEmail('day3', { name: '[Client Name]', project: '[Project Name]' }),
            'followup-day7.txt': this.generateFollowUpEmail('day7', { name: '[Client Name]', project: '[Project Name]' }),
            'followup-day14-close.txt': this.generateFollowUpEmail('day14-close', { name: '[Client Name]', project: '[Project Name]' }),
            'followup-day30-nurture.txt': this.generateFollowUpEmail('no-reply-30', { name: '[Client Name]', project: '[Project Name]' }),
            'testimonial-request.txt': this.generateTestimonialRequest({ clientName: '[Client Name]', name: '[Project Name]' }),
            'referral-request.txt': this.generateReferralRequest({ name: '[Client Name]', project: '[Project Name]' }),
            'reengagement-campaign.txt': this.generateReEngagementCampaign({ name: '[Client Name]', project: '[Project Name]' })
        };

        Object.entries(templates).forEach(([filename, template]) => {
            let content;
            if (template.subject) {
                content = `Subject: ${template.subject}\n\n${template.body}`;
            } else {
                content = template;
            }
            fs.writeFileSync(path.join(dir, filename), content);
        });

        return dir;
    }
}

if (require.main === module) {
    const followup = new FollowUpAutomation();
    const command = process.argv[2];

    switch (command) {
        case 'schedule':
            const schedulePath = followup.generateFollowUpSchedule();
            console.log('✓ Follow-up schedule exported:', schedulePath);
            break;
        case 'templates':
            const templatesPath = followup.exportAllTemplates();
            console.log('✓ Follow-up templates exported to:', templatesPath);
            console.log('  Files: followup-day3.txt, followup-day7.txt, followup-day14-close.txt, followup-day30-nurture.txt, testimonial-request.txt, referral-request.txt, reengagement-campaign.txt');
            break;
        case 'pending':
            const pending = followup.getPendingFollowUps();
            console.log(`Pending follow-ups: ${pending.length}`);
            pending.forEach(f => {
                console.log(`  - ${f.id} (${f.type}) - Due: ${f.scheduledFor}`);
            });
            break;
        default:
            console.log('Usage: node followup-automation.js <schedule|templates|pending>');
    }
}

module.exports = FollowUpAutomation;
