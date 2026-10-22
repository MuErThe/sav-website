#!/usr/bin/env zsh
# Full snapshot: build, check, crawl, screenshots, Lighthouse, size report.
#   ./run.sh <label>          e.g. ./run.sh baseline  or  ./run.sh after
# Output lands in audit/<label>/. Needs Google Chrome installed.
set -eu
label=$1
here=${0:a:h}; root=${here:h}
out="$here/$label"; mkdir -p "$out"
cd "$root"
{ time npm run build; } 2>&1 | grep -vE '^\s*(├|└|▶)' > "$out/build.log"
npm run check > "$out/check.log" 2>&1 || true
node "$here/cspserve.mjs" dist vercel.json > "$out/serve.log" 2>&1 &
pid=$!
trap "kill $pid 2>/dev/null || true" EXIT
until curl -s -o /dev/null http://localhost:4327/; do sleep 0.5; done
cd "$here"
node crawl.mjs http://localhost:4327 "$out/local"
node crawl.mjs https://www.sav.construction "$out/live"
node shots.mjs http://localhost:4327 "$out/shots"
./lighthouse.sh http://localhost:4327 "$out/lighthouse"
cd "$root"
{ echo "dist bytes: $(du -sk dist | cut -f1)K"; echo "dist files: $(find dist -type f | wc -l | tr -d ' ')"; echo; find dist -type f -exec ls -l {} + | awk '{print $5, $9}' | sort -rn; } > "$out/dist-sizes.txt"
find src -type f \( -name '*.astro' -o -name '*.ts' -o -name '*.css' \) -print0 | xargs -0 wc -l | sort -n > "$out/source-lines.txt"
echo "snapshot complete: $out"
