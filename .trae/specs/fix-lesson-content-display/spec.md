# 课程章节内容显示修复规格

## Why
用户反馈课程章节点进去后没有内容，需要确保章节内容能够正确显示。

## What Changes
- 检查并修复学习页面中课程数据匹配问题
- 检查并修复路由参数解析问题
- 检查并修复Markdown内容渲染问题

## Impact
- Affected specs: 课程学习模块
- Affected code: `src/pages/Learning.tsx`

## ADDED Requirements
### Requirement: 课程章节内容显示
系统应确保课程章节点击后能正确显示章节内容

#### Scenario: 章节内容显示
- **WHEN** 用户点击课程章节链接
- **THEN** 应正确加载并显示章节的标题、时长和内容

#### Scenario: 章节内容渲染
- **WHEN** 章节内容包含Markdown格式
- **THEN** 应正确渲染为HTML格式显示

## MODIFIED Requirements
无

## REMOVED Requirements
无

## 排查清单
1. 检查路由参数 (category, courseId, lessonId) 是否正确传递
2. 检查课程数据匹配逻辑 (courseId)
3. 检查章节数据匹配逻辑 (lessonId)
4. 检查Markdown渲染函数
5. 检查内容显示组件
