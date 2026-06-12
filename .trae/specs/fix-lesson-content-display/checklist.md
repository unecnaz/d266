# Checklist

## 路由参数检查
- [ ] App.tsx 中 `/learning/:category/:courseId/lesson-:lessonId` 路由配置正确
- [ ] CourseDetail.tsx 中章节链接格式为 `/learning/${category}/${courseId}/lesson-${lesson.id}`
- [ ] Learning.tsx 中 useParams 正确接收 category, courseId, lessonId

## 课程数据检查
- [ ] CourseDetail.tsx 和 Learning.tsx 中课程ID一致
- [ ] Learning.tsx 中课程数据包含完整的 lessons 数组

## 章节数据检查
- [ ] lessonId 参数能够正确解析为数字
- [ ] 章节匹配逻辑正确 (l.id === lessonNum)

## 内容渲染检查
- [ ] renderMarkdown 函数能够正确处理Markdown格式
- [ ] dangerouslySetInnerHTML 能够正确渲染HTML内容
- [ ] 内容区域正确显示章节内容

## 功能测试检查
- [ ] 点击课程章节 → 进入学习页面，显示章节内容
- [ ] 内容包含标题、时长、正文
