# Deploying AI Service Separately on Railway

## Understanding BASE_URL and AI_SERVICE_URL

### BASE_URL
- **Location**: `src/config/auth0.js`
- **Purpose**: Used for Auth0 authentication callback
- **Why**: Auth0 needs to know your application's URL to redirect users after login/logout
- **Example**: `https://your-app-name.up.railway.app`

### AI_SERVICE_URL
- **Location**: `src/ai/aiClient.js`
- **Purpose**: Your main Node.js app calls the AI service to categorize expenses
- **Example**: `https://ai-service-name.up.railway.app`

---

## Deployment Steps

### Step 1: Deploy the AI Service on Railway

1. **Create a new Railway project** for the AI service:
   - Go to [Railway](https://railway.app)
   - Create a new project
   - Select "Deploy from repo" or upload the `src/ai-service/` folder

2. **Create a `railway.json` or `Procfile` in `src/ai-service/`:**

   ```json
   {
     "$schema": "https://railway.app/railway.json",
     "build": {
       "builder": "PYTHON",
       "pythonVersion": "3.11"
     },
     "deploy": {
       "numReplicas": 1,
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

3. **Set environment variables in Railway for AI service:**
   - `AI_SERVICE_PORT`: `5000`
   - `AI_SERVICE_HOST`: `0.0.0.0`

4. **Deploy and get your AI service URL** (e.g., `https://ai-service-abc123.up.railway.app`)

---

### Step 2: Deploy Your Main Node.js App on Railway

1. **Set environment variables in Railway:**
   ```
   # App URL (for Auth0)
   BASE_URL=https://your-main-app.up.railway.app

   # AI Service URL (use Railway URL when AI is deployed)
   AI_SERVICE_URL=https://ai-service-abc123.up.railway.app
   AI_SERVICE_TIMEOUT=3000

   # Auth0
   AUTH0_DOMAIN=your-tenant.auth0.com
   AUTH0_CLIENT_ID=your-client-id
   AUTH0_CLIENT_SECRET=your-client-secret

   # Database
   MONGODB_URI=your-mongodb-uri

   # Redis - Just use REDIS_URL (Railway provides this automatically)
   # No need to add REDIS_HOST or REDIS_PORT separately
   REDIS_URL=redis://default:password@host:port  (automatically provided by Railway)
   ```

2. **Deploy your main application**

---

### Step 3: Update Environment Variables Locally (for development)

Create a new `.env` file:

```env
# Main App URL (for Auth0)
BASE_URL=http://localhost:3000

# AI Service URL (use Railway URL when AI is deployed)
AI_SERVICE_URL=http://localhost:5000
AI_SERVICE_TIMEOUT=3000

# Other variables...
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
MONGODB_URI=mongodb://localhost:27017/ems
```

---

## Summary

| Variable | Purpose | Example |
|----------|---------|---------|
| `BASE_URL` | Your main app's URL for Auth0 redirects | `https://my-ems-app.up.railway.app` |
| `AI_SERVICE_URL` | URL of the Python AI service | `https://my-ai-service.up.railway.app` |

Both services run independently - the main app makes HTTP requests to the AI service using `AI_SERVICE_URL`.

