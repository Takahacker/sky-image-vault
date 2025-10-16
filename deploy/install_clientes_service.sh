#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 PATH_TO_DIST_CLIENTES"
  echo "Example: sudo ./install_clientes_service.sh /home/ec2-user/dist-clientes/dist-clientes"
  exit 1
fi

DIST_SRC="$1"
INSTALL_DIR=/opt/clientes
SERVICE_SRC="$(dirname "$0")/clientes.service"

echo "Installing clientes from $DIST_SRC to $INSTALL_DIR"

sudo mkdir -p "$INSTALL_DIR"
sudo rm -rf "$INSTALL_DIR"/*
sudo cp -r "$DIST_SRC"/* "$INSTALL_DIR"/
sudo chown -R root:root "$INSTALL_DIR"

sudo cp "$SERVICE_SRC" /etc/systemd/system/clientes.service
sudo systemctl daemon-reload
sudo systemctl enable clientes.service
sudo systemctl restart clientes.service

echo "✅ Done. Service status:"
sudo systemctl status clientes.service --no-pager

echo
echo "To test locally on the EC2 instance:"
echo "  curl -I http://localhost"