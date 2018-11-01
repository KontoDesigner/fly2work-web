#!/bin/sh

set -e

# start nginx
trap "echo shutting down!" SIGINT SIGTERM
nginx -g "daemon off;" &
child=$!
wait "$child"