# Staging Authentication Setup

## Overview
The staging environment is now protected using nginx Basic Authentication instead of application-level auth. This is simpler, more secure, and doesn't interfere with the application's routing or prerendering.

## What Changed

### Removed Files:
- `server/middleware/01.staging-gate.ts` - Deleted
- `server/api/staging-auth.post.ts` - Deleted
- `app/pages/staging-auth.vue` - Deleted
- `STAGING_PASSWORD` from `.env` - Removed

### Nginx Configuration:
Added Basic Auth directives to the staging nginx config.

## Setup Instructions

### 1. Initial Setup (On Server)

SSH into your staging server and run:

```bash
# As forge user
cd /home/forge/staging.konty.com/current
bash deploy/setup-staging-auth.sh
```

This will:
- Install htpasswd if needed
- Create `/etc/nginx/.htpasswd-staging`
- Prompt you to create the first user

### 2. Update Nginx Config

Add these lines to your nginx config after `charset utf-8;`:

```nginx
# Basic Authentication for staging protection
auth_basic "Staging Area - Restricted Access";
auth_basic_user_file /etc/nginx/.htpasswd-staging;
```

Add auth exemptions for monitoring endpoints:

```nginx
location = /api/ping {
    auth_basic off;
}

location = /robots.txt {
    auth_basic off;
}
```

## User Management

### Add a New User
```bash
sudo htpasswd -B /etc/nginx/.htpasswd-staging username
```

### Remove a User
```bash
sudo htpasswd -D /etc/nginx/.htpasswd-staging username
```

### List All Users
```bash
cat /etc/nginx/.htpasswd-staging | cut -d: -f1
```

### Change a Password
Just run the add command again with the same username - it will update the password.

## Testing

1. Visit https://staging.konty.com
2. Browser should show authentication dialog
3. Enter username and password
4. Once authenticated, you can browse the entire site
5. Authentication persists for the browser session

## Benefits Over Previous Solution

1. **No code complexity** - Zero JavaScript/TypeScript for auth
2. **Works with prerendering** - Static files are still protected
3. **No routing issues** - All routes protected uniformly
4. **Standard practice** - Well-understood by all developers
5. **Browser handles it** - Native auth dialog, session management
6. **Monitoring friendly** - Health endpoints accessible without auth

## Troubleshooting

### "403 Forbidden" After Login
- Check password file exists: `ls -la /etc/nginx/.htpasswd-staging`
- Check nginx error log: `tail -f /var/log/nginx/staging.konty.com-error.log`

### Can't Create Password File
- Ensure you have sudo access
- Check disk space: `df -h`

### Forgot All Passwords
- SSH to server and recreate: `sudo htpasswd -B -c /etc/nginx/.htpasswd-staging admin`
- Note: `-c` flag creates new file (removes all existing users)

## Laravel Forge Integration

In Laravel Forge:
1. Go to your staging site
2. Click "Edit Files" → "Edit Nginx Configuration"
3. Add the Basic Auth lines as shown above
4. Click "Save"
5. Forge will automatically reload nginx

## Security Notes

- Passwords are hashed with bcrypt (`-B` flag)
- Use strong passwords (min 12 characters recommended)
- Regularly rotate passwords
- Don't share credentials in plain text
- Consider using different credentials per team member
