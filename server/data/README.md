# GeoLite2 Database Setup

## Quick Setup

1. **Sign up for free MaxMind account:**
   - Go to https://dev.maxmind.com/geoip/geolite2-free-geolocation-data
   - Create a free account
   - Generate a license key

2. **Download the database:**
   ```bash
   MAXMIND_LICENSE_KEY=your_key_here pnpm run download-geolite2
   ```

3. **The database will be saved here:**
   - `server/data/GeoLite2-Country.mmdb`

## Alternative: Manual Download

1. Login to your MaxMind account
2. Download "GeoLite2 Country" database (MMDB format)
3. Extract and place the `.mmdb` file in this directory
4. Rename it to `GeoLite2-Country.mmdb`

## Update Schedule

The database is updated weekly by MaxMind. Set up a cron job or GitHub Action to run:
```bash
pnpm run update-geolite2
```

## Development without Database

If you don't have the database yet, the app will fallback to:
1. CloudFlare headers (if deployed)
2. API-based detection
3. Default locale (RS)

## License

GeoLite2 is free but requires attribution:
"This product includes GeoLite2 data created by MaxMind, available from https://www.maxmind.com"