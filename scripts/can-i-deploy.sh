#!/bin/bash
# Check if a pacticipant version can be safely deployed.
# -e: exit on error  -u: error on undefined vars  -o pipefail: fail if any piped command fails
set -euo pipefail

. ./scripts/env-setup.sh

PACTICIPANT="${PACTICIPANT:?PACTICIPANT env var is required}"
ENVIRONMENT="${ENVIRONMENT:-dev}"

pact-broker can-i-deploy \
  --pacticipant "$PACTICIPANT" \
  --version="$GITHUB_SHA" \
  --to-environment "$ENVIRONMENT" \
  --retry-while-unknown=10 \
  --retry-interval=30
