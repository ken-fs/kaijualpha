<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 数据规则（kaijualpha，2026-10-28）

- 每个怪兽的「怎么拿」在 `src/data/game.json` 的 `unlock` 字段（answer / cost / requires / sources / conflict），页面标题「How to Get X in Kaiju Alpha (价格)」和摘要都从它来。改价格、加新怪兽时一起改 `unlock`，`answer` 一句话直接给价格和前置条件
- 价格来源：Fandom「Kaiju」页的价格总表（roblox-kaiju-alpha.fandom.com/wiki/Kaiju）为主，kaijualpha.net 价格表为辅；两边对不上就都列进 `sources`（带日期），`conflict` 写清哪个更新
- **不要用 kaijualpha.com 的数据**：它的解锁表里有游戏里不存在的怪兽（Orca），价格和其他来源差两个数量级
- 还没有价格数据的怪兽不写 `unlock`，页面会保持「未公开」的写法，别编数字
