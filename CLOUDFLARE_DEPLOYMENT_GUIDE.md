# AI Tutor - Cloudflare Deployment Guide

## ⚠️ IMPORTANT NOTICE

Your Next.js 16 application uses features that are **challenging to deploy on Cloudflare Pages**:
- SQLite database with better-sqlite3 (not compatible with Cloudflare Workers)
- Server-side API routes with stateful connections
- File system dependencies

## Recommended Approach: Use Emergent's Native Deployment

**Why Emergent Deployment is Better:**
1. ✅ No code changes required
2. ✅ SQLite works out-of-the-box
3. ✅ All features work immediately
4. ✅ 50 free deployment credits/month
5. ✅ One-click deployment

**How to Deploy with Emergent:**
1. Click the "Deploy" button in Emergent chat
2. Your app goes live in 2-3 minutes
3. Get a production URL instantly

---

## Alternative: Cloudflare Deployment (Advanced - Requires Significant Refactoring)

### Prerequisites
- Cloudflare account
- Wrangler CLI: `npm install -g wrangler`
- 4-8 hours of development time for migration

### Phase 1: Database Migration to D1

#### 1.1 Create D1 Database
```bash
wrangler login
wrangler d1 create ai-tutor-db
```

Save the `database_id` from the output.

#### 1.2 Apply Schema
```bash
wrangler d1 execute ai-tutor-db --file=migrations/schema.sql --remote
```

#### 1.3 Seed Data
```bash
wrangler d1 execute ai-tutor-db --file=migrations/seed.sql --remote
```

### Phase 2: Code Refactoring Required

You need to update these files to use D1 instead of better-sqlite3:

#### Files to Update:
1. **src/lib/db.ts** - Replace entire file with D1 bindings
2. **src/lib/auth.ts** - Update to use async D1 queries
3. **src/app/api/**/route.ts** - All 20+ API routes need updates
4. **package.json** - Remove better-sqlite3 dependency

#### Example Changes:

**Before (better-sqlite3):**
```typescript
const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
```

**After (D1):**
```typescript
const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
```

**Every API route needs:**
```typescript
export async function GET(request: Request) {
  const db = request.env.DB; // Get D1 instance
  // ... your code
}
```

### Phase 3: Configuration Files

#### 3.1 Create wrangler.toml
```toml
name = "ai-tutor"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB"
database_name = "ai-tutor-db"
database_id = "YOUR_DATABASE_ID_HERE"

[vars]
NEXT_PUBLIC_APP_URL = "https://ai-tutor.pages.dev"
INTEGRATION_PROXY_URL = "https://integrations.emergentagent.com"
```

#### 3.2 Update package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "pages:build": "npx @cloudflare/next-on-pages",
    "preview": "npm run pages:build && wrangler pages dev",
    "deploy": "npm run pages:build && wrangler pages deploy"
  }
}
```

### Phase 4: Deployment

#### 4.1 Build for Cloudflare
```bash
npm run pages:build
```

#### 4.2 Deploy to Cloudflare Pages
```bash
wrangler pages deploy .vercel/output/static
```

#### 4.3 Set Environment Secrets
```bash
wrangler pages secret put EMERGENT_LLM_KEY
# Enter your key when prompted

wrangler pages secret put JWT_SECRET
# Enter your secret when prompted
```

### Phase 5: Post-Deployment

#### 5.1 Configure Custom Domain (Optional)
1. Go to Cloudflare Dashboard → Pages → Your Project
2. Click "Custom domains"
3. Add your domain

#### 5.2 Test Your Deployment
- Login: student@aitutor.com / student123
- Test AI Chat
- Test all features

---

## Challenges You'll Face with Cloudflare

### 1. **Database Incompatibility**
- better-sqlite3 uses Node.js APIs not available in Workers
- All ~20 API routes need refactoring for D1
- Different query syntax and async patterns

### 2. **File System Access**
- No file system in Workers runtime
- Need to refactor any file-based operations

### 3. **Cookie Handling**
- Cloudflare Workers handle cookies differently
- May need middleware updates

### 4. **Testing Complexity**
- Local development with D1 requires Wrangler
- Harder to debug than standard Next.js

### 5. **Build Process**
- Requires @cloudflare/next-on-pages adapter
- Build failures are common with complex apps

---

## Cost Comparison

### Emergent Deployment (Recommended)
- **Free Tier**: 50 credits/month
- **Paid**: ~$5-20/month for production apps
- **Includes**: Database, SSL, CDN, monitoring

### Cloudflare Pages
- **Free Tier**: 
  - 500 builds/month
  - Unlimited requests
  - 100,000 D1 reads/day
  - 50,000 D1 writes/day
- **Paid**: $5/month for more D1 usage
- **Does NOT Include**: Email service, advanced monitoring

---

## Time Estimate

### Emergent Deployment
- **Setup Time**: 2 minutes
- **Code Changes**: None
- **Testing**: 5 minutes
- **Total**: ~10 minutes

### Cloudflare Deployment
- **Database Setup**: 30 minutes
- **Code Refactoring**: 4-6 hours
- **Testing & Debugging**: 2-4 hours
- **Total**: ~8-12 hours

---

## My Strong Recommendation

**Use Emergent's native deployment unless:**
- You absolutely need Cloudflare's specific edge network
- You need to integrate with other Cloudflare services (R2, KV, etc.)
- You're comfortable with significant code refactoring
- You have 8-12 hours to dedicate to migration

The Cloudflare migration is technically feasible but requires substantial work. Your app is production-ready on Emergent right now.

---

## Quick Decision Guide

**Choose Emergent if:**
- ✅ You want to launch quickly
- ✅ You want zero refactoring
- ✅ You need reliable support
- ✅ You value your development time

**Choose Cloudflare if:**
- ⚠️ You need Cloudflare's specific features
- ⚠️ You have 8-12 hours for migration
- ⚠️ You're comfortable with D1
- ⚠️ You enjoy infrastructure challenges

---

## Need Help?

If you decide to proceed with Cloudflare deployment, I can help with:
1. Detailed code examples for D1 migration
2. Debugging specific errors
3. Testing strategies
4. Performance optimization

Just ask!
