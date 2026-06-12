# 课程章节添加问答题规格

## Why
用户需要在课程章节内容中添加问答题，让学习者能够在学习过程中进行自我测试。

## What Changes
- 为每个课程章节添加问答题
- 问答题包含题目和答案
- 支持选择题、填空题、简答题等类型

## Impact
- Affected specs: 课程学习模块
- Affected code: `src/pages/Learning.tsx`

## ADDED Requirements
### Requirement: 章节问答题
每个课程章节应包含相关知识点的问答题

#### Scenario: 查看问答题
- **WHEN** 用户学习章节内容
- **THEN** 应显示相关的问答题供用户练习

#### Scenario: 问答题类型
- **WHEN** 系统显示问答题
- **THEN** 应支持以下类型：
  - 选择题（带选项）
  - 填空题
  - 简答题（开放性问题）

#### Scenario: 问答题内容
- **WHEN** 用户查看问答题
- **THEN** 应显示：
  - 题目内容
  - 答案提示或参考答案
