# 课程学习功能规格

## Why
用户反馈课程中心的课程点击"开始学习"后没有显示相关知识内容，需要确保从课程中心到学习页面的完整流程能够正确显示课程章节内容。

## What Changes
- 修复课程中心 → 课程详情 → 学习页面的完整导航流程
- 确保学习页面能够正确加载和显示章节内容
- 优化课程章节内容渲染，支持Markdown格式

## Impact
- Affected specs: 课程中心模块、学习模块
- Affected code: 
  - `src/App.tsx` - 路由配置
  - `src/pages/Courses.tsx` - 课程中心
  - `src/pages/CourseDetail.tsx` - 课程详情
  - `src/pages/Learning.tsx` - 学习页面

## ADDED Requirements
### Requirement: 课程学习页面
系统应提供完整的课程学习功能

#### Scenario: 从课程中心进入学习
- **WHEN** 用户点击课程中心的课程卡片
- **THEN** 跳转到课程详情页面

#### Scenario: 点击开始学习
- **WHEN** 用户在课程详情页面点击"开始学习"按钮
- **THEN** 跳转到该课程第一章的学习页面，并显示章节内容

#### Scenario: 点击章节列表
- **WHEN** 用户在课程详情页面点击课程章节
- **THEN** 跳转到对应章节的学习页面，并显示章节内容

#### Scenario: 学习页面内容显示
- **WHEN** 学习页面加载完成
- **THEN** 应显示：
  - 章节标题
  - 章节时长
  - 章节内容（支持Markdown渲染）
  - 左侧课程大纲
  - 章节导航按钮

## MODIFIED Requirements
### Requirement: 路由配置
- **MODIFIED**: 确保 `/learning/:category/:courseId/lesson-:lessonId` 路由能够正确匹配并加载Learning组件

## REMOVED Requirements
无
