#!/bin/bash

git pull

PID=$(lsof -ti :80)
if [ -n "$PID" ]; then
  kill -9 $PID
fi

pnpm build && node .output/server/index.mjs