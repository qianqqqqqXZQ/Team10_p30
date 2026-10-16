# P30 原始资料归档

来源目录：`C:\Users\asus\Desktop\6acf87b98bad522cdc6294e4`。

复制日期：2026 年 10 月 16 日。除本说明及本目录的归档规范外，资料保留原始内容。

| 归档内容 | 网站用途 |
| --- | --- |
| `results/bid_P30.tex` | 英文正式竞标书，完整阅读面板、成员、方案、时间安排和适配理由的主依据 |
| `results/bid_P30_zh.tex` | 对应中文正式竞标书，供事实和语义核对 |
| `results/project_plan_P30.md` | 内部实施计划，辅助核对技术路线、日期和范围；网站仍以正式英文竞标书为准 |
| `docs/character/` | 七位成员原始背景资料及格式规范；仅展示竞标书中已确认且与项目相关的内容 |
| `docs/projects/` | 原始项目目录 PDF，P30 说明位于原目录第 95–97 页 |
| `docs/requirements/bid_requirements.md` | 课程竞标要求，供内容结构与事实核对 |
| `SOURCE-AGENTS.md` | 源仓库操作规范快照，供来源追溯 |

成员资料中可能存在内部待补充字段，网站省略这些字段。网站并不承诺已经实现视频生成、已取得 GPU 或已获得参与者研究批准。

`scripts/extract_bid.py` 将英文 LaTeX 转换为 `src/data/bid.generated.json`。转换保留原有内容和链接，以网页段落、标题、列表表达；LaTeX 的封面、页码、目录和绘图格式不沿用。月度进度图由网站 Vue 时间轴表达，九个阶段的原文任务在完整竞标书阅读面板中保留。
