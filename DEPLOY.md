# Kaiju Alpha — 部署档案

> 上线：2026-09-28 · 状态：✅ 已上线运营中

| 项 | 值 |
|---|---|
| 生产 | https://kaijualpha.world（+ www）|
| 预览 | https://kaijualpha.493129720ljw.workers.dev |
| 仓库 | https://github.com/ken-fs/kaijualpha（public）|
| 注册商 | Spaceship（NS: daisy/lochlan.ns.cloudflare.com，zone active）|
| 部署 | **Git 集成**：push main → Cloudflare Builds（`npm run build` + `npx wrangler deploy`，build token = 舰队共享 drilltoearthscore token）|
| Zone | b9e88d512c3bc55b8319e96a6bfa8ded（MCP `cloudflare_execute` 创建，2026-09-28 验证 zone.create 权限已放开）|
| IndexNow | key `be6df5095c26e26eead7006c4789e7ac`，53 URL 已提交（HTTP 202）；脚本 `scripts/submit-indexnow.mjs` |
| 每日巡检 | site-hygiene MANUAL_SITES 已登记（部署标记/sitemap/关键页）|
| 验收 | verify-baseline.json browserPages 已加 4 页 |

## 待接线（用户步骤）
- **GA4**：GA 后台建 kaijualpha 属性拿 G- ID → 设到 CF build 环境变量 `NEXT_PUBLIC_GA_ID`（可 MCP PATCH trigger）→ 重新构建生效（analytics-consent 已就位，空值不加载）
- **GSC**：GSC 加域属性 → 拿 TXT → 我可用 MCP 加 DNS 记录 → 验证 → 加 gsc-bot 服务账号为 Owner

## 内容引擎（上线后）
- **每日 badge API 巡检**：`badges.roblox.com/v1/universes/10732236937/badges` 出现新 Max 徽章 = 新 kaiju = 当日发页（dungeonlootr Sinister Trigger SOP）
- **codes 帧验证**：Update 51 codes 视频逐帧读兑换框（yt-dlp 429 恢复后）
- 游戏日均 1+ 更（Update 51/6.5 周）→ `/updates` 页候选（v1 未建，进 v2）
