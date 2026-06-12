# Checklist

## 路由配置检查
- [x] App.tsx 中 Learning 组件已导入
- [x] `/learning/:category/:courseId/lesson-:lessonId` 路由已配置
- [x] `/learning/:category/:courseId` 路由已配置
- [x] 路由顺序正确（具体路由在前，通用路由在后）

## 课程中心检查
- [x] 课程卡片链接格式正确：`/courses/${course.category}/${course.id}`

## 课程详情页面检查
- [x] "开始学习"按钮链接到 `/learning/${category}/${courseId}/lesson-1`
- [x] 课程章节列表可点击
- [x] 章节链接格式为 `/learning/${category}/${courseId}/lesson-${lesson.id}`

## 学习页面检查
- [x] Learning 组件正确接收路由参数
- [x] 课程数据包含完整的章节内容
- [x] 章节ID解析正确（parseInt）
- [x] Markdown内容能够正确渲染
- [x] 左侧课程大纲能够正确显示
- [x] 上一章/下一章导航功能正常

## 功能测试检查
- [x] 点击课程中心课程卡片 → 进入课程详情页面
- [x] 点击"开始学习" → 进入第一章学习页面，显示内容
- [x] 点击课程章节 → 进入对应章节学习页面，显示内容
- [x] 点击左侧课程大纲章节 → 切换章节
- [x] 点击"上一章/下一章" → 章节切换

# 完成状态
所有检查点已通过 ✓
