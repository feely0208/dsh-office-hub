import { createPlugin, pkgRootFrom } from '@deepwhale-cn/dsh-guard-core/plugin';
import { registerInfoApi } from './api.js';

const base = createPlugin({
  name: 'office-hub',
  pkgRoot: pkgRootFrom(import.meta.url),
  skillFile: 'skill/office-hub.md',
  binFile: 'bin/cli.mjs',
  description: '深鲸办公台：一个面板看全我们提供的办公/交付/行业合规插件，复制安装命令、直达文档',
  whenToUse: '当用户问「你们有哪些办公类插件」「办公插件怎么装」时使用；或作为日常入口，快速拿到安装命令与文档链接。',
});

export const name = base.name;
export const inject = [...base.inject, 'webServer'];

export function apply(ctx) {
  base.apply(ctx);
  try { if (ctx.webServer?.register) registerInfoApi(ctx); } catch (e) { ctx.logger?.warn?.('[office-hub] 面板出口注册失败: ' + (e?.message || e)); }
}
