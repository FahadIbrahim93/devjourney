# 🚀 GITHUB PAGES DEPLOYMENT
## Deploy Your Service Pages in 5 Minutes

**Goal:** Get `fahadibrahim93.github.io` live with your service pages, portfolio, and tracker — no Vercel needed.

---

## STEP 1: Create/Use Repository

**Option A: Use existing `FahadIbrahim93/FahadIbrahim93.github.io` (recommended)**
```bash
# If repo doesn't exist:
# Go to: https://github.com/new
# Name: FahadIbrahim93.github.io
# Make it PUBLIC
# Don't initialize with README
```

**Option B: Use your current repo**
```bash
# If repo exists, just add docs/ folder to it
cd /h/AI/DevJourney
git remote add pages git@github.com:FahadIbrahim93/FahadIbrahim93.github.io.git
git subtree add --prefix=docs pages main --squash
```

---

## STEP 2: Push to GitHub Pages Branch

```bash
cd /h/AI/DevJourney

# Create gh-pages branch from current state
git subtree push --prefix=docs pages main
```

---

## STEP 3: Enable GitHub Pages

1. Go to: https://github.com/FahadIbrahim93/FahadIbrahim93.github.io/settings/pages
2. **Source:** Deploy from branch
3. **Branch:** `gh-pages` → `/docs`
4. Click **Save**

---

## STEP 4: Verify Deployment

GitHub Pages URL: **`https://fahadibrahim93.github.io`**

**Pages to verify:**
- `/` — Main landing page (docs/index.html)
- `/services/fullstack.html` — Full-stack service
- `/services/ai-agents.html` — AI integration service
- `/services/bengali-ai.html` — Bengali AI training
- `/portfolio/` — Portfolio site (if deployed separately)

---

## ALTERNATIVE: Netlify Drop (No Git Needed)

If GitHub Pages is too slow:

1. Go to: https://app.netlify.com/drop
2. Drag the `docs/` folder onto the page
3. Get instant public URL
4. No account required for testing

---

## WHAT GETS DEPLOYED

```
fahadibrahim93.github.io/
├── index.html                    # Main landing page
├── services/
│   ├── fullstack.html            # Full-stack dev service
│   ├── ai-agents.html            # AI integration service
│   └── bengali-ai.html           # Bengali AI training
└── (portfolio/ if separate repo)
```

**All pages are:**
- ✅ Zero dependencies
- ✅ Static HTML/CSS/JS
- ✅ Mobile-responsive
- ✅ SEO-optimized
- ✅ Brand-consistent (Hope Theory aesthetic)
- ✅ Fast (<10KB per page)

---

## CUSTOM DOMAIN (OPTIONAL)

If you buy `hopetheory.com` or `fahadibrahim.com`:

1. Go to repo Settings → Pages → Custom domain
2. Add your domain
3. Update DNS:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```
4. Enable "Enforce HTTPS"

---

## TROUBLESHOOTING

**Q: Site shows 404**
A: Wait 5-10 minutes. GitHub Pages takes time to build. Check Settings → Pages for build status.

**Q: Styles are broken**
A: Check browser console for CORS errors. GitHub Pages should serve everything fine.

**Q: Links don't work**
A: All links are relative. Should work on any domain.

**Q: Can't push to gh-pages**
A: Use the Netlify Drop method instead — it's instant and no git required.

---

*Never GIVE UP on your HOPES.* ☤
