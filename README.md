# P30 · From Prompt to Film

UNNC GRP Team202610 的全英文竞标展示网站。以 The Art of Cinema 为视觉参考，采用近黑背景、Satoshi 超大标题、电影图片矩阵、弧形成员卡片与滚动卡片效果，展示真实竞标资料。

## 本地运行

需要 Node.js 20.19+ 或 22.12+。在本目录打开终端：

```powershell
npm install
npm run dev
```

终端会打印实际访问地址；默认端口被其他程序占用时 Vite 会选择下一个可用端口。如需指定端口：

```powershell
npm run dev -- --port 5180
```

生产构建与预览：

```powershell
npm run build
npm run preview
```

构建产物位于 `dist/`，可部署至普通静态托管。必须通过 HTTP 服务访问，不要直接双击 `index.html`。此次交付保持在本地，未公开部署。

## 页面内容

- 首屏：正式项目名称、团队名称及竞标书日期。
- Teammates：七位成员，姓名、角色、个人经历、技能、联系方式与拟议 P30 职责；通过卡片和姓名索引切换。
- Ideas & Design：首版范围、四个创作环节、数据流、完整技术方案、评估和交付说明。
- Timeline & Workflow：九个日期区间、月份概览、阶段任务、低负荷安排及暂定日期说明。
- Why Our Team Fits This Project：竞标书中的三项匹配理由、成员证据入口与原文结论。
- Prototype：拟议微电影工作台，提供 Story / Storyboard / Export 三个视图、六个原创插画分镜、故事与风格设置、导出摘要和示例重置；不生成视频或音频。
- Read full bid：独立阅读面板，包含完整英文正文与章节跳转。

成员资料和全文面板支持 Escape 关闭、Tab 焦点循环以及关闭后焦点返回。移动端提供简洁菜单。减少动态效果模式保留静态可读内容和可横向浏览的图片。

## 技术结构

| 位置 | 用途 |
| --- | --- |
| `src/App.tsx` | React 主页面与阅读面板调度，GSAP/ScrollTrigger 和 Lenis 生命周期 |
| `src/components/Timeline.vue` | Vue 3 交互时间轴，使用真实阶段数据，支持键盘切换 |
| `src/components/VueTimeline.tsx` | React 与 Vue 边界，独立挂载并在卸载时销毁 Vue 应用 |
| `src/data/bid.ts` | 共享的 Member / Phase 类型、内容数据和静态资源路径 |
| `src/data/bid.generated.json` | 从正式英文竞标书提取的完整正文与结构化内容 |
| `src/components/PrototypeStudio.tsx` | React 轻交互工作台；同目录 PrototypeFrame.tsx 为原创 SVG 分镜，prototype.css 为响应式样式 |
| `src/data/prototype.ts` | 原型示例的类型化故事、镜头、选项和默认设置 |
| `P30-materials/` | P30 原始资料归档，来源和用途见目录内 README |
| `public/` | 本地图片、字体及逐文件来源记录 |
| `scripts/` | 竞标书提取与素材获取脚本 |
| `tests/` | 内容、交互、键盘操作、布局与图片失败回退的浏览器检查 |
| `qa/` | 1440 / 1024 / 768 / 390 像素宽度的验收截图及检查记录 |

竞标书中的 Python、FastAPI、GPU 队列和影片生成功能是拟议系统方案；本仓库的可运行软件为竞标展示网站。

Prototype 位于团队匹配模块之后、页脚之前，导航入口为第 05 章。创作流程参考正式竞标书及外部项目目录 `GRP-Project-Catalogue-2627-202610131035(2).md` 的 P30 描述（原 PDF 第 95 页）。界面中的《The lantern path》为原创、预设的单角色幻想故事，六个镜头各 8 秒，共 48 秒；插画仅为分镜示意，不是模型生成成果。输入修改仅保存在当前页面，不改变预设分镜或 Story 示例梗概；语言选择同步制作设置与 Export 摘要，示例字幕保持英文。导出按钮禁用，未连接生成服务或下载接口。Reset example 恢复默认视图、首个镜头、故事及设置。

## 内容维护

所有正文以 `P30-materials/results/bid_P30.tex` 为准。内部计划和成员资料用于事实核对，不自动加入额外履历。事实修改需先核对原始资料并同步对应中文正式稿，随后运行：

```powershell
npm run content
npm run build
```

`npm run content` 需要 Python 3，仅使用标准库。生成脚本遇到未支持的 LaTeX 命令时会报错，避免悄悄丢失内容。

网站不新增宣传口号，不将计划描述为成果。30–60 秒短片为首版里程碑，1–2 分钟是需经 GPU 资源与质量验证的目标。缺失的个人资料字段省略。

## 浏览器验证

```powershell
npm run build
npx playwright install chromium
npm test
```

测试配置会优先使用本机已存在的 Chromium 缓存；其他环境使用 Playwright 安装的 Chromium。测试对生产预览运行，使用独立端口 4175 且不复用已有服务，避免误测其他项目；端口占用时会明确失败。测试保存布局截图至 `qa/`，包括 Prototype 三种视图的四种宽度截图。可用 `npm run typecheck` 单独运行 TypeScript / Vue 检查。

图片与字体来源、许可和使用说明见 [ASSETS.md](ASSETS.md)。静态构建不包含原始资料目录中的成员文档与项目目录 PDF；页面仍按竞标展示要求显示正式稿已有的联系方式与学号。
