# 素材来源与用途

## 电影图片

视觉参考：[The Art of Cinema](https://www.theartofcinema.xyz/)，作者 [@KrnDsgn](https://www.krndsgn.com/)。按用户要求选用参考站中的电影图片，全部保存为本地文件，运行网站时不依赖图片外链。

`public/images/cinema-01.jpg` 至 `cinema-12.jpg` 依次对应参考站的 `/images/1.jpeg`、`2.jpeg`、`3.jpeg`、`4.jpeg`、`5.jpeg`、`6.jpeg`、`7.jpeg`、`8.jpeg`、`9.jpeg`、`10.jpeg`、`21.jpeg`、`27.jpeg`。

`cinema-13.jpg` 至 `cinema-16.jpg` 对应参考站的 `/images/11.jpeg` 至 `/images/14.jpeg`，专用于四张工作流卡片。`cinema-17.jpg` 对应 `/images/15.jpeg`，展示于画廊的 REF. 12 位置；`cinema-12.jpg` 展示于页面最下方的团队匹配模块。画廊、工作流卡片和团队匹配模块使用不同图片，全页每张图片只出现一次。

电影画面仅用作竞标展示的视觉参考，不作为成员照片、团队作品或项目生成成果。图片权利仍归各自权利人；参考站的公开可访问状态不代表其授予重新授权。页面的电影画廊、工作流卡片及页脚 credits 均说明图片性质与来源。

逐文件来源记录：`public/asset-sources.json`。重新获取：`python scripts/fetch_assets.py`。

## 字体

Satoshi，由 Indian Type Foundry 发布，通过 [Fontshare](https://www.fontshare.com/fonts/satoshi) 提供，适用 [ITF Free Font License](https://www.fontshare.com/licenses/itf-free-font-license)。使用官方 Fontshare CSS 接口提供的 Regular、Medium、Bold、Black WOFF2 文件，并自托管于 `public/fonts/`，未修改字形或字体名称。

官方 CSS 接口：`https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap`。

## 其他

Prototype 工作台中的六幅分镜及角色参考均为本项目自行编写的 SVG 矢量插画，源码位于 `src/components/PrototypeFrame.tsx`，无外部图片、模型输出或新增字体。画面使用同一提灯旅人的角色轮廓与原创山谷场景，作为 `The lantern path` 预设故事的概念分镜；大预览、缩略图及角色参考复用同一绘制组件。页面标注 “Illustrative storyboard” 和 “Original vector illustration”，不将其作为已完成影片或 AI 生成结果。原型演示文案与故事数据位于 `src/data/prototype.ts`，属于拟议界面示例，未改写正式竞标书。

`public/favicon.svg` 为本项目自行编写的字母 P 图形。图标和箭头由文字与 CSS 绘制，没有引入额外图标素材。

网站内容来自归档的 P30 竞标书，不使用参考站的电影评论、引文或宣传文案。
