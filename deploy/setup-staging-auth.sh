#!/bin/bash

# Setup script for nginx Basic Authentication on staging
# Run this on your server as forge user or root

echo "Setting up Basic Auth for Konty Staging"
echo "========================================="

# Check if htpasswd is installed
if ! command -v htpasswd &> /dev/null; then
    echo "htpasswd not found. Installing apache2-utils..."
    sudo apt-get update
    sudo apt-get install -y apache2-utils
fi

# Create password file if it doesn't exist
HTPASSWD_FILE="/etc/nginx/.htpasswd-staging"

if [ ! -f "$HTPASSWD_FILE" ]; then
    echo "Creating new password file: $HTPASSWD_FILE"
    sudo touch $HTPASSWD_FILE
    sudo chmod 644 $HTPASSWD_FILE
else
    echo "Password file already exists: $HTPASSWD_FILE"
fi

# Add or update user
echo ""
echo "Adding/updating user for staging access"
echo "Enter username (e.g., 'admin' or 'konty'):"
read -r USERNAME

# Create password (will prompt for password)
sudo htpasswd -B $HTPASSWD_FILE "$USERNAME"

echo ""
echo "✅ User '$USERNAME' has been added/updated"
echo ""
echo "To add more users, run:"
echo "  sudo htpasswd -B $HTPASSWD_FILE username"
echo ""
echo "To remove a user, run:"
echo "  sudo htpasswd -D $HTPASSWD_FILE username"
echo ""
echo "To list all users:"
echo "  cat $HTPASSWD_FILE | cut -d: -f1"
echo ""
echo "Now reload nginx to apply changes:"
echo "  sudo nginx -t && sudo systemctl reload nginx"