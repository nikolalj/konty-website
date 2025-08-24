#!/usr/bin/env node

/**
 * Simple script to download MaxMind GeoLite2 Country database
 */
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from 'fs'
import https from 'https'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
const __dirname = dirname(fileURLToPath(import.meta.url))

// Get license key from environment variable
const LICENSE_KEY = process.env.MAXMIND_LICENSE_KEY

if (!LICENSE_KEY) {
  console.error('❌ MAXMIND_LICENSE_KEY environment variable is required')
  console.error('Set it in your crontab or shell environment')
  process.exit(1)
}
const DOWNLOAD_URL = `https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=${LICENSE_KEY}&suffix=tar.gz`
const DB_DIR = join(__dirname, '..', 'server', 'data')
const TEMP_FILE = join(DB_DIR, 'temp.tar.gz')
const DB_PATH = join(DB_DIR, 'GeoLite2-Country.mmdb')

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest)

    const download = (downloadUrl) => {
      https.get(downloadUrl, (response) => {
        // Handle redirects
        if (response.statusCode === 302 || response.statusCode === 301) {
          const redirectUrl = response.headers.location
          console.log('↗️  Following redirect...')
          download(redirectUrl)
          return
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Failed: ${response.statusCode}`))
          return
        }

        response.pipe(file)

        file.on('finish', () => {
          file.close()
          resolve()
        })

        file.on('error', (err) => {
          unlinkSync(dest)
          reject(err)
        })
      }).on('error', reject)
    }

    download(url)
  })
}

async function main() {
  try {
    console.log('📥 Downloading GeoLite2 Country database...')

    // Create data directory
    if (!existsSync(DB_DIR)) {
      mkdirSync(DB_DIR, { recursive: true })
    }

    // Download the tar.gz file
    await downloadFile(DOWNLOAD_URL, TEMP_FILE)
    console.log('✅ Download complete')

    // First, let's see what's in the archive
    console.log('🔍 Examining archive contents...')
    const { stdout: contents } = await execAsync(
      `tar -tzf ${TEMP_FILE} | grep -E '\\.mmdb$' | head -1`
    )

    if (contents.trim()) {
      console.log(`📦 Found database: ${contents.trim()}`)

      // Extract the specific file
      console.log('📦 Extracting database...')
      const { stdout, stderr } = await execAsync(
        `tar -xzf ${TEMP_FILE} -C ${DB_DIR} --wildcards '*.mmdb'`
      )

      if (stderr && !stderr.includes('Removing leading')) {
        console.error('Warning:', stderr)
      }
    } else {
      // If no .mmdb found with grep, extract everything and find it
      console.log('📦 Extracting all files...')
      await execAsync(`tar -xzf ${TEMP_FILE} -C ${DB_DIR}`)
    }

    // Find and rename the .mmdb file
    const { stdout: files } = await execAsync(`find ${DB_DIR} -name "*.mmdb" -type f`)
    const mmdbFile = files.trim().split('\n')[0]

    if (!mmdbFile) {
      throw new Error('No .mmdb file found in archive')
    }

    if (mmdbFile && mmdbFile !== DB_PATH) {
      await execAsync(`mv "${mmdbFile}" "${DB_PATH}"`)
      console.log('✅ Database renamed to GeoLite2-Country.mmdb')
    }

    // Clean up temp file and any extracted directories
    unlinkSync(TEMP_FILE)

    // Clean up extracted directory structure if it exists
    await execAsync(`find ${DB_DIR} -type d -name "GeoLite2-Country*" -exec rm -rf {} + 2>/dev/null || true`)

    console.log('✅ GeoLite2 database installed successfully!')
    console.log(`📁 Location: ${DB_PATH}`)

    // Verify file exists
    if (existsSync(DB_PATH)) {
      const { stdout: size } = await execAsync(`ls -lh "${DB_PATH}" | awk '{print $5}'`)
      console.log(`📊 Size: ${size.trim()}`)
    }

    // Exit successfully
    process.exit(0)

  } catch (error) {
    console.error('❌ Error:', error.message)

    // Clean up on error
    if (existsSync(TEMP_FILE)) {
      unlinkSync(TEMP_FILE)
    }

    process.exit(1)
  }
}

main()
