// client-onboarding.js
// Automated client onboarding and communication system
// Hope Theory - Professional Client Experience

const fs = require('fs');
const path = require('path');

class ClientOnboarding {
    constructor() {
        this.templatesDir = path.join(__dirname, 'templates');
        this.ensureTemplatesDir();
    }

    ensureTemplatesDir() {
        if (!fs.existsSync(this.templatesDir)) {
            fs.mkdirSync(this.templatesDir, { recursive: true });
        }
    }

    generateWelcomeEmail(clientData) {
        return {
            subject: `Welcome! Let's build something great together 🚀`,
            body: `Hi ${clientData.name},

Thank you for choosing to work with me on ${clientData.project || 'your project'}! I'm excited to get started.

Here's what happens next:

1. **Kickoff Call** (30-45 min) — I'll send a Calendly link within 24 hours
2. **Project Setup** — I'll create a shared workspace and communication channel
3. **Discovery** — We'll align on goals, scope, and timeline
4. **First Milestone** — You'll see working code within the first week

**What I need from you before kickoff:**
- [ ] Logo and brand assets (if applicable)
- [ ] Content/copy for the site (or indicate I should use placeholders)
- [ ] Access to any existing systems (domain registrar, hosting, GitHub, etc.)
- [ ] List of must-have features vs nice-to-have features
- [ ] Examples of sites/apps you admire (for style reference)

**How we communicate:**
- Daily updates via [Slack/Discord/email — your preference]
- Weekly demo calls (if needed)
- All code committed to a shared GitHub repo
- Bug tracking and feature requests in a shared board

**My commitment to you:**
- Code that passes lint, tests, and build (10/10 quality)
- Transparent progress — you see everything as it's built
- Proactive communication — no surprises, no scope creep
- On-time delivery — if something slips, you'll know early

If you have any questions before our kickoff call, just reply to this email.

Looking forward to building something great!

Best,
Fahad Ibrahim
Full-Stack React Developer

---
📧 fahad@example.com
🔗 [Portfolio Link]
📱 [Phone if appropriate]`
        };
    }

    generateKickoffAgenda(projectData) {
        return `# KICKOFF MEETING AGENDA
**Project:** ${projectData.name}
**Date:** ${new Date().toLocaleDateString()}
**Duration:** 30-45 minutes

---

## 1. INTRODUCTIONS (2 min)
- Brief background on both sides
- Communication preferences

## 2. PROJECT VISION (10 min)
- **Business Goal:** What problem are we solving?
- **Target Users:** Who is this for?
- **Success Metrics:** How will we measure success?
- **Timeline:** When do you need this live?

## 3. SCOPE & FEATURES (15 min)
- **Must-Have Features:** (P0 - critical for launch)
- **Should-Have Features:** (P1 - important but not blocking)
- **Could-Have Features:** (P2 - nice to have, can wait)
- **Won't-Have:** (Out of scope for this project)

## 4. TECHNICAL REQUIREMENTS (10 min)
- **Existing Systems:** What are we integrating with?
- **Hosting:** Where will this be deployed?
- **Domain:** Do you have a domain? SSL?
- **Third-Party Services:** Stripe, email, analytics, etc.
- **Data Migration:** Any existing data to import?

## 5. DESIGN & BRANDING (5 min)
- **Brand Guidelines:** Colors, fonts, logo
- **Design References:** Sites/apps you admire
- **Content:** Who's writing copy? Who's creating images?

## 6. WORKFLOW & COMMUNICATION (5 min)
- **Communication Channel:** Slack, Discord, email?
- **Update Cadence:** Daily, weekly, on-demand?
- **Demo Schedule:** Weekly calls or milestone-based?
- **Feedback Process:** How do you want to review work?

## 7. NEXT STEPS (3 min)
- Action items for both sides
- Timeline for first deliverable
- Schedule next check-in

---

## PRE-MEETING CHECKLIST

**Client should prepare:**
- [ ] Brand assets (logo, colors, fonts)
- [ ] Content (or indication to use placeholders)
- [ ] Examples of inspiration sites
- [ ] List of must-have features
- [ ] Access credentials (if applicable)
- [ ] Questions about the process

**Freelancer should prepare:**
- [ ] Project workspace setup (GitHub repo, Slack channel, etc.)
- [ ] Architecture sketch (high-level)
- [ ] Timeline estimate
- [ ] Questions about requirements
- [ ] Sample deliverables from similar projects
`;
    }

    generateQuestionnaire() {
        return `# CLIENT ONBOARDING QUESTIONNAIRE
**Project:** _______________
**Date:** _______________

Please answer the following questions to help us get started efficiently. The more detail you provide, the better I can serve you.

---

## BUSINESS CONTEXT

**1. What does your business/idea do?**
[Your answer]

**2. Who is your target audience?**
[Demographics, psychographics, user personas]

**3. What problem does this project solve?**
[Specific pain points]

**4. Who are your main competitors?**
[And what do you do better than them?]

---

## PROJECT GOALS

**5. What are the top 3 goals for this project?**
1. [Goal 1]
2. [Goal 2]
3. [Goal 3]

**6. How will you measure success?**
[KPIs, metrics, ROI expectations]

**7. What's the launch deadline (if any)?**
[Date or "flexible"]

---

## FEATURES & FUNCTIONALITY

**8. List ALL features you want (don't worry about priority):**
- [Feature 1]
- [Feature 2]
- [Feature 3]
- [...]

**9. Which features are MUST-HAVE for launch?**
- [Critical feature 1]
- [Critical feature 2]

**10. Are there features you want to add LATER (post-launch)?**
- [Future feature 1]
- [Future feature 2]

---

## DESIGN & BRANDING

**11. Do you have brand guidelines?**
- [ ] Yes (I'll share)
- [ ] No (please help me create)
- [ ] Partial (I'll share what I have)

**12. Do you have a logo?**
- [ ] Yes (I'll share)
- [ ] No (I need one)
- [ ] Using text/wordmark only

**13. List 3 websites/apps you LOVE the design of:**
1. [URL + what you like about it]
2. [URL + what you like about it]
3. [URL + what you like about it]

**14. List 3 websites/apps you DISLIKE the design of:**
1. [URL + what you don't like]
2. [URL + what you don't like]
3. [URL + what you don't like]

**15. Color preferences?**
[Colors you love / hate / brand colors if specified]

---

## TECHNICAL

**16. Do you have an existing website/app?**
- [ ] No, this is new
- [ ] Yes, I'm replacing it
- [ ] Yes, this is an addition

**17. Do you have a hosting/domain preference?**
- [ ] Vercel (recommended)
- [ ] Netlify
- [ ] AWS / Google Cloud / Azure
- [ ] Your existing hosting (please specify)
- [ ] I need a recommendation

**18. What third-party services do you need?**
- [ ] Stripe (payments)
- [ ] Email (SendGrid, Mailgun, etc.)
- [ ] Analytics (Google Analytics, Mixpanel, etc.)
- [ ] Auth (Google, Facebook, etc.)
- [ ] Other: [specify]

**19. Do you have any data to migrate?**
- [ ] No
- [ ] Yes (please describe format and size)

---

## CONTENT

**20. Who is writing the copy/text?**
- [ ] Me (I have it ready)
- [ ] You (please use placeholder text)
- [ ] I need help (can you recommend someone?)

**21. Do you have images/photos?**
- [ ] Yes (I'll provide)
- [ ] No (please use stock photos)
- [ ] I need a photographer

---

## BUDGET & TIMELINE

**22. What's your total budget for this project?**
$[Amount or range]

**23. What's your payment preference?**
- [ ] Fixed price (milestone-based)
- [ ] Hourly
- [ ] Monthly retainer

**24. Are there any hard deadlines?**
- [ ] No
- [ ] Yes: [Date + reason]

---

## COMMUNICATION

**25. Preferred communication method:**
- [ ] Email
- [ ] Slack
- [ ] Discord
- [ ] WhatsApp
- [ ] Other: [specify]

**26. Best time for calls (timezone):**
[Your availability]

**27. How often do you want updates?**
- [ ] Daily
- [ ] Weekly
- [ ] At milestones only
- [ ] On-demand

---

## ANYTHING ELSE?

**28. Is there anything else I should know?**
[Additional context, concerns, questions]

---

Thank you for taking the time to fill this out! I'll review your answers and reach out within 24 hours to schedule our kickoff call.

— Fahad Ibrahim
`;
    }

    generateStatusUpdate(projectData) {
        return {
            subject: `Weekly Update: ${projectData.name} — ${new Date().toLocaleDateString()}`,
            body: `Hi ${projectData.clientName || 'there'},

Here's your weekly status update for **${projectData.name}**:

---

## 📊 PROGRESS THIS WEEK

✅ **Completed:**
- [Task 1]
- [Task 2]
- [Task 3]

🔄 **In Progress:**
- [Task 4 - 60% complete]
- [Task 5 - starting today]

📅 **Planned for Next Week:**
- [Task 6]
- [Task 7]

---

## 🎯 MILESTONE STATUS

${projectData.currentMilestone ? `**Current Milestone:** ${projectData.currentMilestone.name} (${projectData.currentMilestone.percent}% complete)
**Target Completion:** ${projectData.currentMilestone.dueDate}
**Status:** ${projectData.currentMilestone.status || 'On Track'}` : 'All milestones on schedule'}

---

## 📸 SCREENSHOTS / DEMO

${projectData.demoUrl ? `[View latest demo](${projectData.demoUrl})` : 'Demo available on request'}

---

## ⚠️ BLOCKERS OR RISKS

${projectData.blockers ? projectData.blockers : 'None at this time.'}

---

## 💰 FINANCIAL STATUS

- **Invoiced this period:** $${projectData.invoicedThisPeriod || 0}
- **Paid:** $${projectData.paidThisPeriod || 0}
- **Outstanding:** $${projectData.outstanding || 0}

---

## 📞 NEXT STEPS

- ${projectData.nextStep1 || 'Continue development'}
- ${projectData.nextStep2 || 'Weekly check-in scheduled'}

---

Let me know if you have any questions or want to discuss anything!

Best,
Fahad`
        };
    }

    generateCompletionEmail(projectData) {
        return {
            subject: `🎉 ${projectData.name} is complete!`,
            body: `Hi ${projectData.clientName},

I'm thrilled to announce that **${projectData.name}** is officially complete and ready for launch!

---

## 📦 WHAT'S DELIVERED

✅ [Feature 1]
✅ [Feature 2]
✅ [Feature 3]
✅ [Feature 4]
✅ Production deployment
✅ Documentation
✅ 30-day bug fix warranty

---

## 🔗 IMPORTANT LINKS

- **Live Site:** ${projectData.liveUrl}
- **Admin Dashboard:** ${projectData.adminUrl}
- **GitHub Repository:** ${projectData.repoUrl}
- **Documentation:** ${projectData.docsUrl}

---

## 📚 HANDOVER NOTES

**To manage the site yourself:**
1. [Step 1 — e.g., "Log in to Vercel with your account"]
2. [Step 2 — e.g., "Claim the domain transfer"]
3. [Step 3 — e.g., "Update DNS settings"]

**To update content:**
- [Instructions for content updates]

**To add new features:**
- Contact me for a quote, or
- Hire a developer familiar with the stack (React, TypeScript, Supabase)

---

## 🐛 30-DAY BUG FIX WARRANTY

For the next 30 days, I'll fix any bugs in the code I wrote, free of charge. This covers:
- Functionality not working as specified
- Errors or crashes
- Browser compatibility issues

Just email me at [your email] with details and I'll respond within 24 hours.

---

## 💬 FEEDBACK

I'd love to hear your thoughts! Could you:
1. Take a quick 2-minute survey: [Survey Link]
2. Leave a review on [Upwork/Fiverr/etc.]
3. Refer me to anyone who might need similar work

Your feedback helps me improve and helps other clients find me.

---

## 🚀 WHAT'S NEXT?

If you'd like ongoing support, I offer:
- **Monthly maintenance:** $X/month (X hours of updates/fixes)
- **Feature development:** Quoted per feature
- **Priority support:** X-hour response time for critical issues

Just let me know!

---

Thank you for trusting me with your project. It was a pleasure working with you.

Best,
Fahad Ibrahim
Full-Stack React Developer

---
P.S. If you have any questions in the next 30 days, just reply to this email. I'm here to help!`
        };
    }

    exportAllTemplates() {
        const templates = {
            welcome: this.generateWelcomeEmail({ name: '[Client Name]', project: '[Project Name]' }),
            kickoffAgenda: this.generateKickoffAgenda({ name: '[Project Name]' }),
            questionnaire: this.generateQuestionnaire(),
            statusUpdate: this.generateStatusUpdate({ name: '[Project Name]', clientName: '[Client Name]' }),
            completion: this.generateCompletionEmail({ name: '[Project Name]', clientName: '[Client Name]' })
        };

        Object.entries(templates).forEach(([key, value]) => {
            const fileName = key === 'kickoffAgenda' || key === 'questionnaire' ? `${key}.md` : `${key}.txt`;
            const content = typeof value === 'string' ? value : `Subject: ${value.subject}\n\n${value.body}`;
            fs.writeFileSync(path.join(this.templatesDir, fileName), content);
        });

        return this.templatesDir;
    }
}

if (require.main === module) {
    const onboarding = new ClientOnboarding();
    const exportPath = onboarding.exportAllTemplates();
    console.log('✓ Client onboarding templates exported to:', exportPath);
    console.log('  Files: welcome.txt, kickoffAgenda.md, questionnaire.md, statusUpdate.txt, completion.txt');
}

module.exports = ClientOnboarding;
