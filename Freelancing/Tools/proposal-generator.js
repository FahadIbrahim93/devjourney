// proposal-generator.js
// Automated proposal generation system for freelance outreach
// Hope Theory - Revenue-First Engineering

const fs = require('fs');
const path = require('path');

class ProposalGenerator {
    constructor() {
        this.profiles = {
            react: {
                name: 'React Application',
                template: this.loadTemplate('react'),
                rate: 60,
                deliveryDays: 7,
                keyProof: 'https://bugsmasher-ten.vercel.app',
                techStack: 'React 19, TypeScript, Supabase, PostgreSQL, Tailwind'
            },
            fullstack: {
                name: 'Full-Stack Application',
                template: this.loadTemplate('fullstack'),
                rate: 70,
                deliveryDays: 14,
                keyProof: 'https://bugsmasher-ten.vercel.app',
                techStack: 'React, Node.js, Supabase, PostgreSQL, RLS'
            },
            ecommerce: {
                name: 'E-Commerce Store',
                template: this.loadTemplate('ecommerce'),
                rate: 65,
                deliveryDays: 14,
                keyProof: 'https://rollon-delta.vercel.app',
                techStack: 'React, TypeScript, Stripe, Tailwind'
            },
            bugfix: {
                name: 'Bug Fix / Technical Debt',
                template: this.loadTemplate('bugfix'),
                rate: 50,
                deliveryDays: 3,
                keyProof: 'production bug fixes with root cause analysis',
                techStack: 'React, TypeScript, debugging'
            },
            pwa: {
                name: 'PWA / Mobile App',
                template: this.loadTemplate('pwa'),
                rate: 55,
                deliveryDays: 10,
                keyProof: 'https://bugsmasher-ten.vercel.app (PWA with offline support)',
                techStack: 'React, Service Workers, PWA, IndexedDB'
            }
        };
    }

    loadTemplate(type) {
        return {
            react: `Hi,

I saw your post about needing a React developer, and I'd love to help you build {{SPECIFIC_REQUIREMENT}}.

Here's what I understand you're looking for:
{{PROBLEM_SUMMARY}}

My relevant experience:
I built BugSmasher — a full-stack React app with Supabase backend that's live in production. It handles authentication (email + Google + Discord OAuth), real-time leaderboards, and offline-first sync. Live demo: {{KEY_PROOF}}

I've shipped {{SHIPPED_COUNT}} production apps that pass lint, tests, and build. My code delivers working software, not "close enough."

How I'd approach your project:
1. {{STEP_1}} — set up the project with proper TypeScript structure
2. {{STEP_2}} — core feature implementation with iterative updates
3. {{STEP_3}} — testing, polish, and production deployment

Reducing your risk:
- I can share a working prototype within {{PROTOTYPE_TIME}}
- You'll see the code as I build, not just at the end
- I communicate proactively — if something slips, you'll know early

Next step:
Happy to jump on a quick call to discuss your requirements in detail, or if you prefer, I can outline a more detailed plan based on what you've shared.

Best,
Fahad Ibrahim
Full-Stack React Developer`,

            fullstack: `Hi,

You're looking for someone who can build {{SPECIFIC_REQUIREMENT}} — that's exactly what I do.

My relevant proof:
I built BugSmasher — a full-stack React app with Supabase (PostgreSQL) backend, handling:
- User authentication (email + Google OAuth + Discord OAuth)
- Database with Row Level Security policies
- Real-time leaderboards and cloud sync
- Production deployment on Vercel

Live demo: {{KEY_PROOF}}
GitHub: https://github.com/FahadIbrahim93/BugSmasher-HopeTheory

That's production code — not a tutorial. My apps pass lint, tests, and production builds.

My approach:
{{APPROACH_DESCRIPTION}}

Risk reduction:
- I can show you a working demo before you hire
- Transparent communication throughout
- Clean, documented code you can maintain later

Let's talk:
I'm available for a quick call to discuss your backend architecture. What database and auth solution are you targeting?

Best,
Fahad Ibrahim
Full-Stack React Developer`,

            ecommerce: `Hi,

I saw your post about building an e-commerce {{STORE_TYPE}}. I'd love to help.

My relevant work:
I built RollON — a custom e-commerce application with:
- Product catalog with variant handling (size, color, quantity)
- Shopping cart with persistence
- Responsive mobile-first design
- Production deployment on Vercel

Live: {{KEY_PROOF}}

Not a Shopify template — custom-built for the client's brand. The code passes production quality gates.

What I'd build for you:
- Product management {{CATALOG_FEATURES}}
- {{CHECKOUT_FEATURES}}
- {{MOBILE_FEATURES}}
- {{ADMIN_FEATURES}}

Risk reduction:
- I'll deliver working increments, not a final "surprise"
- You can see the code anytime on GitHub
- I document for your future maintenance

Next step:
Let's discuss your product catalog and brand. I'd prefer to understand your specific needs before quoting — are you available for a quick call?

Best,
Fahad Ibrahim
Full-Stack React Developer`,

            bugfix: `Hi,

I saw you're dealing with {{SPECIFIC_BUG}}. That sounds like {{SIMILAR_PROBLEM}}.

My relevant fix:
I've handled similar issues in production apps:
- {{EXAMPLE_1}}
- {{EXAMPLE_2}}

I understand the difference between "working locally" and "production stable." My code handles edge cases.

My approach:
1. Reproduce the issue
2. Identify root cause
3. Implement fix
4. Verify it doesn't break other things

Risk reduction:
- I test my fixes before declaring them done
- I don't just patch symptoms — I find the root cause
- I'll document what changed and why

Let's start:
Can you share the current behavior vs expected? I'll give you a timeline after I review the codebase. Happy to jump on a call.

Best,
Fahad Ibrahim
Full-Stack React Developer`,

            pwa: `Hi,

I saw your post about needing a PWA / mobile app. I specialize in building mobile-installable React applications with offline support.

My relevant work:
I built BugSmasher as a PWA with:
- Service worker for offline gameplay
- Installable on iOS and Android
- Background sync when reconnecting
- Push notification ready
- App-store quality UX

Live demo: {{KEY_PROOF}}

What I'd build for you:
- {{PWA_FEATURES}}
- {{OFFLINE_FEATURES}}
- {{NATIVE_FEATURES}}

Risk reduction:
- Working prototype before final delivery
- Code you can maintain and extend
- Production deployment to your domain

Next step:
What's the core functionality of your mobile app? Are you targeting iOS, Android, or both?

Best,
Fahad Ibrahim
Full-Stack React Developer`
        }[type];
    }

    generate(projectData) {
        const {
            type = 'react',
            clientName = '',
            projectName = '',
            specificRequirement = '',
            problemSummary = '',
            budget = '',
            timeline = '',
            techStack = ''
        } = projectData;

        const profile = this.profiles[type];
        if (!profile) {
            throw new Error(`Unknown project type: ${type}. Available: ${Object.keys(this.profiles).join(', ')}`);
        }

        let proposal = profile.template;

        // Replace placeholders with actual data or defaults
        const replacements = {
            '{{SPECIFIC_REQUIREMENT}}': specificRequirement || `[your ${profile.name.toLowerCase()} project]`,
            '{{PROBLEM_SUMMARY}}': problemSummary || `You need a ${profile.name.toLowerCase()} that works in production, not just a demo.`,
            '{{KEY_PROOF}}': profile.keyProof,
            '{{SHIPPED_COUNT}}': '10+',
            '{{STEP_1}}': this.getStep1(type),
            '{{STEP_2}}': this.getStep2(type, projectData),
            '{{STEP_3}}': this.getStep3(type),
            '{{PROTOTYPE_TIME}}': '48 hours',
            '{{APPROACH_DESCRIPTION}}': this.getApproachDescription(type, projectData),
            '{{STORE_TYPE}}': 'store',
            '{{CATALOG_FEATURES}}': 'with categories, variants, and search',
            '{{CHECKOUT_FEATURES}}': 'Stripe-ready checkout flow',
            '{{MOBILE_FEATURES}}': 'mobile-first responsive design',
            '{{ADMIN_FEATURES}}': 'admin dashboard (if needed)',
            '{{SPECIFIC_BUG}}': '[specific issue]',
            '{{SIMILAR_PROBLEM}}': 'something I can diagnose and fix efficiently',
            '{{EXAMPLE_1}}': 'Fixed auth flow race conditions in Supabase integration',
            '{{EXAMPLE_2}}': 'Resolved PWA service worker caching issues in production',
            '{{PWA_FEATURES}}': 'Service worker, manifest, installable',
            '{{OFFLINE_FEATURES}}': 'IndexedDB for local data persistence',
            '{{NATIVE_FEATURES}}': 'Native-like gestures and animations'
        };

        for (const [placeholder, value] of Object.entries(replacements)) {
            proposal = proposal.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
        }

        return {
            proposal,
            metadata: {
                type: profile.name,
                rate: profile.rate,
                deliveryDays: profile.deliveryDays,
                estimatedBudget: budget || `$${profile.rate * profile.deliveryDays} (hourly) or fixed-price quote`,
                wordCount: proposal.split(/\s+/).length,
                generatedAt: new Date().toISOString()
            }
        };
    }

    getStep1(type) {
        const steps = {
            react: 'Set up the project with React 19 + TypeScript + Vite',
            fullstack: 'Architecture planning and database schema design',
            ecommerce: 'Product data model and catalog structure',
            bugfix: 'Reproduce the issue in a controlled environment',
            pwa: 'Configure manifest and service worker'
        };
        return steps[type] || 'Project setup and planning';
    }

    getStep2(type, projectData) {
        const steps = {
            react: `Build the core features you need (${projectData.specificRequirement || 'as discussed'})`,
            fullstack: 'Implement API endpoints, authentication, and database access',
            ecommerce: 'Cart logic, checkout flow, and product variants',
            bugfix: 'Identify and fix the root cause',
            pwa: 'Add offline storage and background sync'
        };
        return steps[type] || 'Core feature implementation';
    }

    getStep3(type) {
        const steps = {
            react: 'Testing, accessibility, and Vercel deployment',
            fullstack: 'Testing, security audit, and production launch',
            ecommerce: 'Payment integration testing and launch',
            bugfix: 'Verify fix and test for regressions',
            pwa: 'Test installation on iOS/Android and optimize performance'
        };
        return steps[type] || 'Testing and deployment';
    }

    getApproachDescription(type, projectData) {
        const approaches = {
            react: `I'd start with a clear component architecture, set up TypeScript properly, and build the UI with iterative feedback. For ${projectData.specificRequirement || 'your feature'}, I'd focus on reusable patterns and proper state management.`,
            fullstack: `For your ${projectData.specificRequirement || 'full-stack app'}, I'd design the database schema first, then build the API layer with proper error handling and validation, before connecting the React frontend.`,
            ecommerce: `For your ${projectData.specificRequirement || 'e-commerce store'}, I'd focus on a clean product browsing experience, persistent cart, and Stripe-ready checkout. Mobile-first design is a must.`,
            bugfix: `I'd reproduce the issue first, trace through the code to find the root cause (not just patch symptoms), then implement a fix that handles edge cases. I'd also add tests to prevent regression.`,
            pwa: `For your PWA, I'd set up the manifest and service worker first, ensure offline functionality works smoothly, then add the features that make it feel native.`
        };
        return approaches[type] || 'I focus on clear architecture, iterative development, and production-quality code.';
    }

    saveProposal(proposalData, filename) {
        const dir = path.join(__dirname, 'generated_proposals');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const filePath = path.join(dir, filename);
        const content = `# Proposal: ${proposalData.metadata.type}
**Generated:** ${proposalData.metadata.generatedAt}
**Word Count:** ${proposalData.metadata.wordCount}
**Suggested Rate:** $${proposalData.metadata.rate}/hr
**Delivery Time:** ${proposalData.metadata.deliveryDays} days
**Estimated Budget:** ${proposalData.metadata.estimatedBudget}

---

${proposalData.proposal}

---

## Tracking Information
- [ ] Sent to client
- [ ] Follow-up date: ___
- [ ] Client response: ___
- [ ] Interview scheduled: ___
- [ ] Contract sent: ___
- [ ] Project won/lost: ___
`;

        fs.writeFileSync(filePath, content);
        return filePath;
    }
}

// CLI interface
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log('Usage: node proposal-generator.js <type> [options]');
        console.log('Types: react, fullstack, ecommerce, bugfix, pwa');
        console.log('\nExample: node proposal-generator.js react --requirement "build a dashboard" --budget 2000');
        process.exit(1);
    }

    const type = args[0];
    const projectData = { type };

    // Parse command line arguments
    const argMapping = {
        'requirement': 'specificRequirement',
        'problem': 'problemSummary',
        'client': 'clientName',
        'project': 'projectName',
        'tech': 'techStack'
    };

    for (let i = 1; i < args.length; i += 2) {
        const key = args[i].replace(/^--/, '');
        const value = args[i + 1];
        const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        const mappedKey = argMapping[camelKey] || camelKey;
        projectData[mappedKey] = value;
    }

    const generator = new ProposalGenerator();
    try {
        const result = generator.generate(projectData);
        console.log('\n=== GENERATED PROPOSAL ===\n');
        console.log(result.proposal);
        console.log('\n=== METADATA ===');
        console.log(JSON.stringify(result.metadata, null, 2));

        // Save to file
        const filename = `proposal-${type}-${Date.now()}.md`;
        const filepath = generator.saveProposal(result, filename);
        console.log(`\n✓ Saved to: ${filepath}`);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

module.exports = ProposalGenerator;
