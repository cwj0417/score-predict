#!/bin/bash

git pull

PID=$(netstat -tulnp | grep :80 | awk '{print $7}' | cut -d'/' -f1)
if [ -n "$PID" ]; then
  kill -9 $PID
fi

pnpm build && export NITRO_PORT="80" && node .output/server/index.mjs &