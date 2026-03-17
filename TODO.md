# MongoDB Connection Fix - Node 24 Compatibility

## Approved Plan Steps:
- [x] Step 1: Update `src/config/db.js` with IPv4-only + TLS options for Node 24 DNS/SRV fix.
- [ ] Step 2: Remove hardcoded MONGO_URI from all `src/script/*.js` files (use process.env only).
- [ ] Step 3: Test connection with `npm run dev` and verify "Mongo db connected" log.
- [ ] Step 4: Run DNS test if needed.
- [ ] Step 5: Complete task.

Status: Step 1 In Progress - DNS ECONNREFUSED persists. Added debug logs. Test dev server logs + nslookup. If DNS fails, use standard URI.

