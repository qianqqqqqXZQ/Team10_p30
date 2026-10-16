# Ziqian XIONG

## 基本信息

- 姓名：Ziqian XIONG
- 小组角色：Leader（组长）
- 专业与年级：宁波诺丁汉大学计算机科学本科；年级待补充
- 学号：20721428
- 邮箱：scyzx7@nottingham.edu.cn

## 个人简介

Ziqian XIONG（熊子谦）是宁波诺丁汉大学计算机科学本科生，本 GRP 软件开发小组的 Leader（组长）。个人网站列示 GPA 为 3.7。研究兴趣集中于计算机视觉（CV）与 AI Infra，已有医学图像分割、3D/4D 重建、算法工程集成及个人软件项目经历，目前也在开展多任务神经网络与 FPGA 自适应推理研究。

曾在小马智行人工智能部担任算法实习生，参与重建流水线的方案验证与工程集成，并独立开发投入公司使用的 4DGS 点云编辑与对比工具。另有学生会、校园行政实习和舞蹈团队组织经历，承担过人员协调、会议记录、活动统筹及校内外沟通工作。兴趣爱好包括舞蹈、音乐与魔术。

资料来源：[个人网站](https://qqqqqprofile.vercel.app/)、[学术与项目经历页面](https://qqqqqprofile.vercel.app/experience)、[个人背景页面](https://qqqqqprofile.vercel.app/profile)，首次整理日期为 2026 年 10 月 14 日；2026 年 10 月 15 日复核个人网站及其链接的 GitHub 仓库，补充下列项目技术栈。经历与个人贡献依据网站自述，技术栈依据仓库 README、依赖清单及源代码；仓库不可访问的部分保留待确认。

## 技能与特长

- 编程语言：个人网站列示 Python、Verilog、C/C++、Java、Haskell、HTML、CSS、JavaScript 和 Lean。
- 数据库：MySQL。
- 计算机科学基础：本科已修课程包括数据库与接口、算法导论、编程与算法、编程范式、软件工程、计算机系统架构、人工智能导论及计算机科学数学基础。
- 研究与实现：PyTorch、OpenMMLab（MMSegmentation、MMCV、MMEngine）、CNN-Transformer 分割模型，以及 RAG（Retrieval-Augmented Generation，检索增强生成）；模型实现涉及拉普拉斯金字塔、边缘分离、注意力融合和边界感知损失。RAG 技能由用户于 2026 年 10 月 15 日补充。
- 数据处理与实验评估：具有医学图像数据集归一化、标注筛查、子集划分及对比实验经历，使用 Dice、IoU 和推理速度等指标评估模型。
- 3D/4D 重建与工具开发：具有 VGGT 方案评估、3D Gaussian Splatting 重建流水线集成及 4D Gaussian Splatting 点云编辑工具开发经历。
- 应用开发：MomoFocus 仓库采用 React、TypeScript、CSS、Electron 与 Vite，结合 localStorage、dnd-kit 和 electron-builder；4DGS 工具采用 Flask 与 Three.js/WebGL，提供 Docker 配置。各项以对应仓库中已核实的实现为依据。
- 智能体辅助开发与文档：在实习期间研究智能体辅助开发实践，编写有关 harness、loop engineering 等工作流的使用文档。
- 团队组织与沟通：具有人员排班、通知发布、会议纪要、跨部门对接、大型活动统筹及合作洽谈经验。
- 语言能力：中文为母语；具备英语使用基础，正在备考 TOEFL，网站未提供考试成绩。
- 正在研究的方向：多任务双分支神经网络、early exit 调度及 FPGA 动态资源再分配；相关系统方案仍处于研究与评估阶段。

## 相关项目与经验

- **小马智行（Pony.ai）人工智能部算法实习生｜2026 年 7 月—9 月**：系统调研 VGGT 相关 3D/4D 重建技术，包括 QVGGT、Dynamic-VGGT、VGGT-4D、VGGT-MPR 和 MoSca，探索其在自动驾驶场景重建与仿真中的应用。针对原有基于 DA3 深度估计和 3D Gaussian Splatting 的对象级重建流水线，引入 VGGT 开展多视角几何与深度估计对比，完成方案验证、工程集成及全流程替换；网站自述重建质量与稳定性得到提升，未提供量化结果。另独立开发 4DGS 工具，并编写智能体辅助开发工作流文档。
- **4DGS-Edit-and-Compare 个人项目｜2026 年 7 月—9 月**：在小马智行实习期间独立开发 4D Gaussian Splatting 点云编辑与对比工具，支持对选定点云区域旋转、平移和删除，也支持同时编辑、对比多个点云并输出量化评估指标。网站自述该工具已被小马智行使用。技术栈：Python/Flask 后端，JavaScript/Three.js/WebGL 交互前端，NumPy/SciPy 数值处理，PyTorch/plyfile 点云文件处理，并提供 Docker 打包配置；依据仓库 README、`requirements.txt`、`app.py` 与 `Dockerfile` 核实。[项目仓库](https://github.com/qianqqqqqXZQ/4DGS-Edit-and-Compare)。
- **MomoFocus 个人项目｜2026 年 9 月—10 月**：开发将待办事项、备忘录与番茄钟整合到同一工作空间的专注效率工具，帮助用户组织任务、记录灵感及安排专注学习。网站将其列为个人项目。技术栈：React、TypeScript、CSS、Electron 和 Vite；使用 electron-builder 构建桌面安装包、localStorage 本地持久化，以及 dnd-kit 列表拖拽排序。依据仓库 `README.md`、`package.json`、`src/App.tsx` 和 `src/SortableList.tsx` 核实，未据此推定已发布正式版本。[项目仓库](https://github.com/qianqqqqqXZQ/MomoFocus)。
- **面向小息肉分割的边缘增强双流 Transformer 研究｜2025 年 5 月—至今**：导师为 Prof. Fiseha Berhanu Tesema。基于 OpenMMLab 搭建双流 CNN-Transformer 模型，实现并调试 CNN 分支、Transformer 分支、边缘分离、注意力融合及损失函数等子模块；整理和预处理 Kvasir-SEG、ETIS-LaribPolypDB 数据集，完成归一化、标注筛查及小息肉子集划分；开展对比实验，使用 Dice、IoU 和推理速度验证模型表现。技术栈：Python、PyTorch，以及 OpenMMLab 的 MMSegmentation、MMCV 和 MMEngine；依据研究仓库 README 的环境与实验说明核实。2026 年 10 月 15 日复核时，个人网站列示论文以第二作者身份投稿至 CVIU，尚未列示录用或发表信息；此处更新此前记录的投稿去向。[研究仓库](https://github.com/dashen2004/Edge-Enhanced-Dual-Stream-Transformer-for-Small-Polyp-Segmentation)。
- **面向个性化关键词识别的动态双分支神经网络研究｜2026 年 6 月—至今**：导师为 Prof. Heng Yu。提出面向关键词识别（KWS）与说话人验证（Speaker Verification，SV）的多任务双分支网络，引入 early exit 调度，使分支在满足置信度或执行条件后提前结束计算；在系统层面探索将提前退出分支释放的 FPGA 资源重新分配给另一分支，关注硬件利用率、推理延迟和吞吐率。目前仍在评估网络设计、调度策略及资源再分配方案。2026 年 10 月 15 日访问主页链接的 GitHub 仓库及公开 API 均返回 404，因此暂无法核实编程框架、依赖或 FPGA 工具链，具体实现技术栈待确认。[研究仓库](https://github.com/qianqqqqqXZQ/Dual-Branch_EE)。
- **宁波诺丁汉大学学生会公共关系部｜2024 年 10 月—2025 年 9 月**：参与学生会官方文创商店运营及开放日、毕业典礼等活动现场销售；主要承担人员排班、通知发布、会议纪要和日常团队管理。网站列示商店单场活动销售额峰值超过 3 万元。
- **宁波诺丁汉大学学生事务与发展中心行政实习生｜2025 年 3 月—2026 年 6 月**：通过校园热线为学生、家长和校友提供支持，协调外部合作机构咨询并解答学籍、档案流程问题；通过档案系统管理学生材料，以邮件对接校内部门，收集和整理相关文件。
- **宁波诺丁汉大学 Shuffle Crew 副队长｜2025 年 9 月—2026 年 7 月**：主导 Show Night、XShow 和新年晚会等校园活动的舞蹈编排，负责动作设计、队形安排及音乐剪辑；统筹年度专场演出的多个节目，并参与演出；代表团队与校内外组织沟通，开展合作洽谈、联合主办和现场支持。网站列示个人校园专场即兴表演视频在抖音获得超过 500 万次播放和 7 万次点赞。
- **樟树中学学生会主席｜2022 年 9 月—2023 年 7 月**：统筹宣传部、纪检部等部门，主持每周例会，组织纪律与教室卫生检查，并协助策划和执行运动会、校园艺术节等大型活动；多次获评“优秀学生会干部”。
- **校外舞蹈活动策划、教学与赛事参与｜具体起止时间待补充**：组织及联合主办街舞活动与赛事，推动宁波高校街舞社群交流，并与阿迪达斯等品牌合作；受邀担任全国比赛分站赛及高校赛事的裁判和嘉宾。作为宁波二十二 Locking Crew 成员参与公开演出及大型音乐视频拍摄；在江西舞月天舞蹈工作室担任舞蹈教师，连续多年负责周年庆导师秀编舞。网站自述获得多个校外赛事奖项，未列明奖项名称和时间。

## 本项目职责

- 以下按最终获分配项目安排，P19、P21、P30 互为备选；分工以已有经历和兴趣为依据，结合导师反馈及实际进度调整。
- **P19**：协调团队及导师沟通，结合科研和软件项目经历指导系统设计、技能匹配、排序实验与模型集成。
- **P21**：协调团队及导师沟通，指导系统设计、比较抽取与 LLM 方法，并连接结构化数据和报告生成。
- **P30**：协调团队、导师沟通和 GPU 安排，结合视觉计算与集成经历指导系统设计、视频模型实验及角色一致性检查。
