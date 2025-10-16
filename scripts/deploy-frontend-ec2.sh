#!/usr/bin/env bash
# Deploy Vite-built frontend to one or more EC2 instances using rsync + nginx
# Usage:
#   chmod +x scripts/deploy-frontend-ec2.sh
#   ./scripts/deploy-frontend-ec2.sh \
#     --hosts "ec2-user@ec2-1.example,ubuntu@ec2-2.example" \
#     --ssh-key ~/.ssh/mykey.pem \
#     --remote-dir /var/www/sky-image-vault
# The script will run `npm run build`, then sync `dist/` to each host and restart nginx.

set -euo pipefail

print_usage() {
  cat <<EOF
Usage: $0 --hosts "user@host1,user@host2" --ssh-key /path/to/key [--remote-dir /var/www/sky-image-vault]

Options:
  --hosts       Comma-separated list of SSH targets (user@host)
  --ssh-key     Path to private SSH key
  --remote-dir  Remote directory to serve the site (default: /var/www/sky-image-vault)
  --port        SSH port (default: 22)
EOF
}

HOSTS=""
SSH_KEY=""
REMOTE_DIR="/var/www/sky-image-vault"
SSH_PORT=22

while [[ $# -gt 0 ]]; do
  case $1 in
    --hosts) HOSTS="$2"; shift 2 ;;
    --ssh-key) SSH_KEY="$2"; shift 2 ;;
    --remote-dir) REMOTE_DIR="$2"; shift 2 ;;
    --port) SSH_PORT="$2"; shift 2 ;;
    -h|--help) print_usage; exit 0 ;;
    *) echo "Unknown arg: $1"; print_usage; exit 1 ;;
  esac
done

if [[ -z "$HOSTS" || -z "$SSH_KEY" ]]; then
  echo "--hosts and --ssh-key are required"
  print_usage
  exit 1
fi

# Build locally
echo "Building frontend..."
npm run build

# Ensure dist exists
if [[ ! -d dist ]]; then
  echo "dist/ not found after build"
  exit 1
fi

# Loop hosts
IFS=',' read -r -a HOST_ARRAY <<< "$HOSTS"
for target in "${HOST_ARRAY[@]}"; do
  echo "Deploying to $target"
  # create remote dir (may require sudo)
  ssh -i "$SSH_KEY" -p $SSH_PORT "$target" "sudo mkdir -p $REMOTE_DIR && sudo chown \$(whoami):\$(whoami) $REMOTE_DIR"

  # sync files
  rsync -az --delete -e "ssh -i $SSH_KEY -p $SSH_PORT" dist/ "$target:$REMOTE_DIR/"

  # set permissions and restart nginx (supports ubuntu and amazon-linux)
  ssh -i "$SSH_KEY" -p $SSH_PORT "$target" <<'SSH_EOF'
if command -v systemctl >/dev/null 2>&1; then
  # try to restart nginx service name variants
  if sudo systemctl list-units --type=service | grep -q nginx; then
    sudo systemctl restart nginx
  elif sudo systemctl list-units --type=service | grep -q httpd; then
    sudo systemctl restart httpd
  else
    echo "No nginx/httpd service found; please install and configure a web server to serve $REMOTE_DIR"
  fi
else
  echo "systemctl not available; cannot restart web server automatically"
fi
SSH_EOF

  echo "Deployed to $target"
done

echo "All done. Test your site via the ALB or by visiting the instance public IP."
