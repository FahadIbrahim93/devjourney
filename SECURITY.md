# Security policy

## Reporting a vulnerability
Please **do not open a public issue**. Use GitHub's private reporting:
**Security → Report a vulnerability** on this repository (private vulnerability reporting is enabled).
You'll get a reply within 7 days.

## What this repo is
`devjourney` is Hope Theory's **public** portfolio repo (site source, service pages, revenue assets).
It holds **no client data**. Agency and client work is managed privately, outside this repo.
If you spot client-identifying or financial information here, please report it privately as above.

## Protections in place
- Secret scanning + push protection
- Dependabot alerts + security updates
- Ruleset on `main`: no force-pushes, no branch deletion
- GitHub Actions: read-only default token; workflows from fork PRs need approval
- `public-hygiene` workflow blocks client names, invoice numbers, amounts and stray contacts in agency files
