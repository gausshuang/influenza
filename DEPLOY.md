# 🚀 GitHub Pages 部署指南

## 快速部署步骤

### 1. 创建GitHub仓库

1. 访问 [GitHub](https://github.com) 并登录账号
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息:
   - Repository name: `influenza` (或其他名称)
   - Description: `中国流感监测数据平台`
   - 选择 Public (GitHub Pages需要)
   - ✅ 不要初始化README、.gitignore或license (因为我们已有文件)

### 2. 推送代码到GitHub

在当前项目目录下执行以下命令:

```bash
# 添加远程仓库 (替换为你的GitHub用户名)
git remote add origin https://github.com/你的用户名/influenza.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 3. 启用GitHub Pages

1. 进入你的GitHub仓库页面
2. 点击 **Settings** 选项卡
3. 在左侧菜单中找到 **Pages**
4. 在 "Source" 部分选择 **GitHub Actions**
5. 点击 **Save**

### 4. 等待自动部署

- GitHub Actions会自动触发部署流程
- 在 **Actions** 选项卡中可以查看部署进度
- 部署完成后，访问: `https://你的用户名.github.io/influenza`

## 🔧 配置Google AdSense (可选)

### 申请AdSense账号

1. 访问 [Google AdSense](https://www.google.com/adsense/)
2. 使用Google账号登录并创建AdSense账号
3. 添加网站: `https://你的用户名.github.io/influenza`
4. 等待审核通过

### 更新广告代码

审核通过后，在 `index.html` 中替换以下内容:

```html
<!-- 替换发布商ID -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-你的发布商ID"></script>

<!-- 替换广告单元ID -->
<ins class="adsbygoogle"
     data-ad-client="ca-pub-你的发布商ID"
     data-ad-slot="你的广告单元ID">
</ins>
```

## 📝 自定义域名 (可选)

### 购买域名

1. 在域名注册商处购买域名 (如: `influenza-data.com`)
2. 在DNS设置中添加CNAME记录:
   - Name: `www` 或 `@`
   - Value: `你的用户名.github.io`

### 配置GitHub Pages

1. 在仓库Settings > Pages中
2. 在 "Custom domain" 输入你的域名
3. ✅ 启用 "Enforce HTTPS"
4. 等待DNS验证完成

## 🔄 更新网站内容

### 添加新的流感数据

1. **复制新的PDF文件**到项目目录
2. **更新data.json文件**，添加新周的数据:

```json
{
  "week": "2025年第31周",
  "reportNumber": "第868期",
  "dateRange": "2025年7月28日-8月3日",
  "positiveRate": 16.5,
  "visitRate": 4.2,
  "outbreaks": 10,
  "samples": 2952,
  // ... 其他数据
}
```

3. **更新log.md文件**，记录修改内容
4. **提交并推送**:

```bash
git add .
git commit -m "添加第31周流感监测数据"
git push origin main
```

### 修改网站内容

- 编辑HTML、CSS、JS文件
- 测试本地效果
- 提交推送后自动部署

## 📊 网站分析和优化

### 集成Google Analytics

1. 创建[Google Analytics](https://analytics.google.com/)账号
2. 获取跟踪代码
3. 在`index.html`的`<head>`部分添加:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### SEO优化建议

1. **添加sitemap.xml**
2. **优化meta描述和关键词**
3. **提交到Google Search Console**
4. **定期更新内容**
5. **优化页面加载速度**

## 🔍 故障排除

### 常见问题

**部署失败:**
- 检查GitHub Actions日志
- 确保所有文件格式正确
- 验证GitHub Pages设置

**网站无法访问:**
- 等待DNS传播 (最多24小时)
- 检查HTTPS设置
- 清除浏览器缓存

**广告不显示:**
- 确认AdSense审核通过
- 检查广告代码是否正确
- 等待广告系统生效

### 技术支持

- [GitHub Pages文档](https://docs.github.com/pages)
- [Google AdSense帮助](https://support.google.com/adsense)
- [项目Issues](https://github.com/你的用户名/influenza/issues)

## 🎉 部署完成检查清单

- [ ] GitHub仓库创建成功
- [ ] 代码推送到main分支
- [ ] GitHub Pages配置启用
- [ ] 网站可以正常访问
- [ ] 所有页面功能正常
- [ ] 图表显示正确
- [ ] 响应式设计工作正常
- [ ] Google AdSense配置 (如需要)
- [ ] 自定义域名配置 (如需要)
- [ ] Google Analytics集成 (如需要)

---

**祝贺! 🎊 你的流感监测网站已成功部署到GitHub Pages!**

访问地址: `https://你的用户名.github.io/influenza`