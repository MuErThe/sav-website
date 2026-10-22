#!/usr/bin/env zsh
# Build, crawl and screenshot the local build into audit/<label>/, then diff
# against the baseline. Extra args pass through to verify.mjs (e.g. --allow=...).
#   ./pass.sh <label> [--shots] [verify args]
set -u
label=$1; shift
shots=0; [ "${1:-}" = "--shots" ] && { shots=1; shift; }
here=${0:a:h}; root=${here:h}; out="$here/$label"
rm -rf "$out"; mkdir -p "$out"
cd "$root"
npm run build > "$out/build.log" 2>&1 || { echo BUILD FAILED; tail -20 "$out/build.log"; exit 2; }
npm run check > "$out/check.log" 2>&1 || { echo CHECK FAILED; tail -20 "$out/check.log"; exit 2; }
grep -E "Result|errors|warnings" "$out/check.log" | tail -3
node "$here/cspserve.mjs" dist vercel.json > "$out/serve.log" 2>&1 &
pid=$!
trap "kill $pid 2>/dev/null || true" EXIT
until curl -s -o /dev/null http://localhost:4327/; do sleep 0.3; done
cd "$here"
node crawl.mjs http://localhost:4327 "$out/local" > "$out/crawl.log" 2>&1
[ $shots = 1 ] && node shots.mjs http://localhost:4327 "$out/shots" > "$out/shots.log" 2>&1
node verify.mjs baseline "$out" "$@"
