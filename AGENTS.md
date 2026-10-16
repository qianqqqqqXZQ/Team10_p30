# P30 竞标展示网站

- 网站全英文，团队名称为 `UNNC GRP Team202610`。不新增宣传口号，不编造经历或已完成的交付成果。
- React 负责主页面，Vue 负责交互时间轴；共享类型化数据位于 `src/data/`。
- `P30-materials/` 是源资料归档，英文正式竞标书为网站内容依据。原始文件不在网页编辑过程中改写。
- `scripts/extract_bid.py` 从归档的英文 LaTeX 提取完整正文与结构化数据；修改资料后运行 `npm run content` 并核对结果。
- `public/images/` 和 `public/fonts/` 为本地静态素材，来源及许可记录见 `ASSETS.md`。
- 项目计划中的视频生成应用仅作竞标内容展示，本项目实现展示网站。
- 完成修改后运行 `npm run build`；涉及交互与布局时运行 `npm test` 并视觉检查 `qa/` 截图。
- 新增资料或调整目录用途时同步维护 README 及对应说明。
