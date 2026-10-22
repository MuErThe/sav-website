#!/usr/bin/env zsh
# Lighthouse, mobile and desktop, for the four audited routes.
#   ./lighthouse.sh <base-url> <out-dir>
set -eu
base=$1; out=$2
mkdir -p "$out"
export CHROME_PATH="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
for route in / /projects/alembic-pharmaceuticals/ /gallery/ /contact/; do
  slug=${route:gs/\//_}; slug=${slug#_}; slug=${slug%_}; [ -z "$slug" ] && slug=home
  for preset in mobile desktop; do
    flags=(--quiet --chrome-flags="--headless=new --no-sandbox" --output=json --output-path="$out/$slug-$preset.json" --only-categories=performance,accessibility,best-practices,seo)
    [ "$preset" = desktop ] && flags+=(--preset=desktop)
    npx lighthouse "$base$route" "${flags[@]}"
  done
done
node - "$out" <<'EOF'
const fs = require('node:fs'); const dir = process.argv[2];
const rows = [];
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
  const r = JSON.parse(fs.readFileSync(`${dir}/${f}`));
  const c = r.categories, a = r.audits;
  rows.push({ run: f.replace('.json', ''), perf: Math.round(c.performance.score * 100), a11y: Math.round(c.accessibility.score * 100), bp: Math.round(c['best-practices'].score * 100), seo: Math.round(c.seo.score * 100), LCP: a['largest-contentful-paint'].displayValue, CLS: a['cumulative-layout-shift'].displayValue, TBT: a['total-blocking-time'].displayValue, INP: a['interaction-to-next-paint']?.displayValue ?? 'n/a (lab)' });
}
console.table(rows); fs.writeFileSync(`${dir}/scores.json`, JSON.stringify(rows, null, 2));
EOF
