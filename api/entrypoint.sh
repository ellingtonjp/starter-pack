#!/bin/bash

# Remove a potentially pre-existing server.pid for Rails
rm -f /myapp/tmp/pids/server.pid

# Exec container's main process (eg CMD in Dockerfile)
exec "$@"
