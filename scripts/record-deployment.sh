#!/bin/bash
# Record deployment in Pact Broker only for main/master branch.
# -e: exit on error  -u: error on undefined vars  -o pipefail: fail if any piped command fails
set -euo pipefail

. ./scripts/env-setup.sh

PACTICIPANT="${PACTICIPANT:?PACTICIPANT env var is required}"

if [ "$GITHUB_BRANCH" = "main" ] || [ "$GITHUB_BRANCH" = "master" ]; then
  pact-broker record-deployment \
    --pacticipant "$PACTICIPANT" \
    --version "$GITHUB_SHA" \
    --environment "${npm_config_env:-dev}"
else
  echo "Skipping record-deployment: not on main branch (current: $GITHUB_BRANCH)"
fi
