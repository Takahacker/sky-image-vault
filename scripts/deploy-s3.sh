#!/usr/bin/env bash
set -euo pipefail

# Simple deploy script for Vite React site to AWS S3
# Usage:
#   chmod +x scripts/deploy-s3.sh
#   VITE_CLIENTS_URL="https://clientes.example.com" ./scripts/deploy-s3.sh your-bucket-name [--invalidate CLOUD_FRONT_DISTRO_ID]

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <s3-bucket-name> [--invalidate <cloudfront-distribution-id>]"
  exit 1
fi

BUCKET="$1"
shift

INVALIDATE=false
CLOUDFRONT_ID=""
if [ "${1-}" = "--invalidate" ]; then
  if [ -z "${2-}" ]; then
    echo "--invalidate requires a CloudFront distribution id"
    exit 1
  fi
  INVALIDATE=true
  CLOUDFRONT_ID="$2"
fi

# Allow overriding VITE_CLIENTS_URL on the command line via env var (already set if provided)
echo "Building site..."
npm run build

echo "Syncing dist/ to s3://$BUCKET ..."
aws s3 sync dist/ s3://$BUCKET --delete --acl public-read

if [ "$INVALIDATE" = true ]; then
  echo "Creating CloudFront invalidation for distribution $CLOUDFRONT_ID ..."
  aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_ID" --paths "/*"
  echo "Invalidation requested"
fi

echo "Deploy complete. Website should be available at the S3 website endpoint or via CloudFront if configured."
