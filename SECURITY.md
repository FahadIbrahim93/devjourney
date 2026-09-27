# Security policy

## Reporting a vulnerability
Please **do not open a public issue**. Use GitHub's private reporting:
**Security → Report a vulnerability** on this repository (private vulnerability reporting is enabled).
You'll get a reply within 7 days.

## What this repo is
`devjourney` is Hope Theory's **public** agency hub: docs, tooling and agency-level issues.
It holds **no client data**. Clients appear only as codes (Client A, B…). Names, contacts, amounts,
invoice numbers and bank details live in Notion and in each client's private repository.
If you spot client-identifying or financial information here, please report it privately as above.

## Protections in place
- Secret scanning + push protection
- Dependabot alerts + security updates
- Ruleset on `main`: no force-pushes, no branch deletion
- GitHub Actions: read-only default token; workflows from fork PRs need approval
- `public-hygiene` workflow blocks client names, invoice numbers, amounts and stray contacts in agency files
