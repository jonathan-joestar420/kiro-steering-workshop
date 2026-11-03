#!/bin/sh
# 將總部共用規範安裝到本機全域 Steering（~/.kiro/steering/）。
# 正式環境建議由 MDM 或群組原則派送同一份檔案。
set -eu

SRC_DIR="$(cd "$(dirname "$0")" && pwd)"
DEST_DIR="${KIRO_HOME:-$HOME/.kiro}/steering"
DEST="$DEST_DIR/hq-standards.md"

mkdir -p "$DEST_DIR"
if [ -e "$DEST" ] && ! cmp -s "$SRC_DIR/hq-standards.md" "$DEST"; then
  cp "$DEST" "$DEST.bak"
  echo "已備份既有檔案：$DEST.bak"
fi
cp "$SRC_DIR/hq-standards.md" "$DEST"
echo "已安裝：$DEST"
