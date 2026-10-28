#!/bin/bash
set -uo pipefail
cd "$(dirname "$0")/.."
PASS=0; FAIL=0
ok(){ echo "  ✅ $1"; PASS=$((PASS+1)); }
bad(){ echo "  ❌ $1"; FAIL=$((FAIL+1)); }
echo ""; echo "  深鲸办公台 · 回归"
node bin/cli.mjs | grep -q "深鲸办公台" && ok "CLI 帮助" || bad "CLI 帮助缺失"
node bin/cli.mjs | grep -q "dsh-doc-batch" && ok "列出文档插件" || bad "缺文档插件"
node bin/cli.mjs | grep -q "dsh-deliverable-pack" && ok "列出交付包" || bad "缺交付包"
grep -q "office-hub" cordis.patch.yml && ok "组合层 id" || bad "组合层缺失"
node -e '
const fs=require("fs");
const s=fs.readFileSync("lib/client.js","utf8");
if(!/sidebar\.panellist/.test(s)) process.exit(1);
if(!/main/.test(s)) process.exit(1);
if(!/deepwhale\.org\.cn/.test(s)) process.exit(2);
' && ok "客户端含图标+面板+官网链接" || bad "客户端结构不对"
echo "  ────────────────────────────────────────"; echo "  通过 $PASS · 失败 $FAIL"
[ "$FAIL" -eq 0 ]
