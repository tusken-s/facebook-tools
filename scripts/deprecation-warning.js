#!/usr/bin/env node

try {
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';
  
  console.log(`
${yellow}⚠️  WARNING: @tusken-s/facebook-tools is DEPRECATED and no longer maintained.

Please migrate to official Facebook solutions:
- Facebook Graph API: https://developers.facebook.com/docs/graph-api/
- Facebook SDKs: https://developers.facebook.com/docs/apis-and-sdks/
${reset}`);
} catch (error) {
  // Silently fail to avoid breaking installation
  process.exit(0);
}
