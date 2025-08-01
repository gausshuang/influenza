# 🦠 中国流感监测数据平台

一个基于中国疾病预防控制中心流感监测周报数据的可视化平台，提供实时流感监测数据分析和趋势预测。

## ✨ 功能特色

- 📊 **数据可视化**: 交互式图表展示流感趋势、病毒分布和地区情况
- 📈 **历史数据查询**: 支持按时间范围和地区筛选历史数据
- 🗺️ **地区分布**: 可视化展示各省份流感活动水平
- 📱 **响应式设计**: 完美支持手机、平板、电脑多设备访问
- 🔍 **智能搜索**: 快速搜索特定时间段或地区的数据
- 📄 **报告下载**: 提供原始PDF周报下载功能
- 💡 **专业分析**: 基于官方数据的趋势分析和健康建议

## 🚀 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **UI框架**: Bootstrap 5
- **图表库**: Chart.js
- **图标**: FontAwesome 6
- **动画**: Animate.css
- **部署**: GitHub Pages
- **数据格式**: JSON

## 📦 项目结构

```
influenza/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 脚本文件
├── data.json           # 数据文件
├── log.md              # 修改日志
├── README.md           # 项目说明
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions部署配置
└── pdf报告文件/
    ├── 2025年第28周第865期中国流感监测周报.pdf
    ├── 2025年第29周第866期中国流感监测周报.pdf
    └── 2025年第30周第867期中国流感监测周报.pdf
```

## 🔧 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/你的用户名/influenza.git
   cd influenza
   ```

2. **本地预览**
   - 直接打开 `index.html` 文件
   - 或使用本地服务器 (推荐):
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx serve .
   ```

3. **访问网站**
   - 浏览器打开: `http://localhost:8000`

## 📊 数据来源

- **官方来源**: 中国疾病预防控制中心
- **数据类型**: 流感监测周报
- **更新频率**: 每周更新
- **数据范围**: 全国各省份哨点医院监测数据

## 🔄 数据更新流程

1. **手动更新**: 
   - 将新的PDF周报文件复制到项目目录
   - 更新 `data.json` 文件中的数据
   - 提交代码，GitHub Actions自动部署

2. **自动化**(计划中):
   - 定期抓取官方数据
   - 自动解析PDF内容
   - 自动更新数据文件

## 🌟 主要页面

### 首页 (Home)
- 展示最新流感监测数据亮点
- 核心指标快速概览
- 响应式轮播图设计

### 数据仪表板 (Dashboard)
- 实时数据可视化图表
- 交互式数据筛选器
- 关键指标卡片展示

### 历史数据 (History) 
- 历史周报数据表格
- 高级搜索和筛选功能
- PDF报告下载功能

### 关于页面 (About)
- 平台介绍和数据说明
- 联系方式和使用指南

## 💰 广告集成

项目已预配置Google AdSense广告位:
- 首页横幅广告
- 侧边栏矩形广告  
- 底部展示广告

需要替换 `index.html` 中的广告单元ID:
```html
data-ad-client="ca-pub-你的发布商ID"
data-ad-slot="你的广告单元ID"
```

## 🚀 部署到GitHub Pages

1. **创建仓库**
   - 在GitHub创建新仓库
   - 将代码推送到main分支

2. **启用Pages**
   - 进入仓库Settings
   - 找到Pages设置
   - 选择Source: GitHub Actions

3. **自动部署**
   - 每次推送到main分支自动触发部署
   - 通过GitHub Actions工作流自动构建

4. **访问网站**
   - 部署完成后访问: `https://你的用户名.github.io/influenza`

## 📈 未来计划

- [ ] 集成更多数据源
- [ ] 添加数据预测功能
- [ ] 开发移动端App
- [ ] 增加多语言支持
- [ ] 添加用户个性化设置
- [ ] 集成机器学习预测模型

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件

## 📞 联系方式

- 📧 邮箱: your-email@example.com
- 🌐 网站: https://你的用户名.github.io/influenza
- 💬 讨论: GitHub Issues

## ⚠️ 免责声明

本平台仅用于数据展示和教育目的，不构成医疗建议。如有健康问题，请咨询专业医疗机构。

---

**让数据服务健康，让科学指导生活** 🌟