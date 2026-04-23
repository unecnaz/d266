import React, { useState, useEffect } from 'react'
import { Code, Database, BarChart2, Globe, ChevronRight } from 'lucide-react'

const Learning: React.FC = () => {
  const [activeTool, setActiveTool] = useState('python')
  const [currentStep, setCurrentStep] = useState(1)
  const [code, setCode] = useState<string>('')

  // 实训指导步骤
  const tutorialSteps = [
    {
      id: 1,
      title: 'Python基础语法',
      content: '学习Python的基本语法，包括变量、数据类型、运算符和流程控制语句。\n\n**变量定义：**\n```python\n# 定义变量\nage = 18\nname = "John"\nis_student = True\n```\n\n**数据类型：**\n- 整数 (int)\n- 浮点数 (float)\n- 字符串 (str)\n- 布尔值 (bool)\n- 列表 (list)\n- 字典 (dict)\n\n**流程控制：**\n```python\n# if语句\nif age >= 18:\n    print("成年人")\nelse:\n    print("未成年人")\n\n# for循环\nfor i in range(5):\n    print(i)\n\n# while循环\ni = 0\nwhile i < 5:\n    print(i)\n    i += 1\n```'
    },
    {
      id: 2,
      title: 'Python函数和模块',
      content: '学习如何定义和使用函数，以及如何导入和使用模块。\n\n**函数定义：**\n```python\ndef greet(name):\n    """问候函数"""\n    return f"Hello, {name}!"\n\n# 调用函数\nprint(greet("Alice"))\n```\n\n**模块导入：**\n```python\n# 导入整个模块\nimport math\nprint(math.pi)\n\n# 导入特定函数\nfrom math import sqrt\nprint(sqrt(16))\n\n# 导入所有函数\nfrom math import *\nprint(sin(0))\n```'
    },
    {
      id: 3,
      title: 'Python数据处理',
      content: '学习使用Python进行数据处理，包括列表操作、字典操作和文件操作。\n\n**列表操作：**\n```python\n# 创建列表\nfruits = ["apple", "banana", "cherry"]\n\n# 访问元素\nprint(fruits[0])  # 第一个元素\nprint(fruits[-1])  # 最后一个元素\n\n# 添加元素\nfruits.append("orange")\n\n# 删除元素\nfruits.remove("banana")\n\n# 列表推导式\nsquares = [x**2 for x in range(10)]\nprint(squares)\n```\n\n**字典操作：**\n```python\n# 创建字典\nstudent = {"name": "John", "age": 18, "grade": "A"}\n\n# 访问值\nprint(student["name"])\n\n# 添加键值对\nstudent["major"] = "Computer Science"\n\n# 删除键值对\ndel student["age"]\n```'
    },
    {
      id: 4,
      title: 'Python数据可视化',
      content: '学习使用Matplotlib库进行数据可视化，创建各种类型的图表。\n\n**安装Matplotlib：**\n```bash\npip install matplotlib\n```\n\n**基本图表：**\n```python\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# 折线图\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\nplt.plot(x, y)\nplt.title("Sin Wave")\nplt.xlabel("X")\nplt.ylabel("Y")\nplt.show()\n\n# 柱状图\nlabels = ["A", "B", "C", "D"]\nvalues = [10, 20, 15, 25]\n\nplt.bar(labels, values)\nplt.title("Bar Chart")\nplt.show()\n\n# 散点图\nx = np.random.rand(50)\ny = np.random.rand(50)\n\nplt.scatter(x, y)\nplt.title("Scatter Plot")\nplt.show()\n```'
    }
  ]

  // 工具选项
  const tools = [
    { id: 'python', name: 'Python编程', icon: <Code size={20} />, color: 'bg-blue-600' },
    { id: 'sql', name: 'SQL查询', icon: <Database size={20} />, color: 'bg-green-600' },
    { id: 'bi', name: 'BI工具', icon: <BarChart2 size={20} />, color: 'bg-orange-600' },
    { id: 'scraping', name: '数据采集', icon: <Globe size={20} />, color: 'bg-purple-600' }
  ]

  // 默认代码
  const defaultCode = {
    python: `# Python编程环境
# 尝试编写代码并运行

# 示例：计算斐波那契数列
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# 测试函数
for i in range(10):
    print(f"fib({i}) = {fibonacci(i)}")

# 练习：计算阶乘
def factorial(n):
    # 在这里编写代码
    pass

# 测试阶乘函数
print("\n阶乘结果：")
for i in range(1, 6):
    print(f"{i}! = {factorial(i)}")`,
    sql: `-- SQL查询环境
-- 尝试编写SQL查询

-- 示例：创建表
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    grade VARCHAR(10)
);

-- 插入数据
INSERT INTO students (id, name, age, grade)
VALUES (1, 'John', 18, 'A'),
       (2, 'Alice', 17, 'B'),
       (3, 'Bob', 19, 'A');

-- 查询所有学生
SELECT * FROM students;

-- 练习：查询年龄大于17的学生
SELECT * FROM students
WHERE age > 17;`,
    bi: `// BI工具模拟环境
// 拖拽字段到此处创建可视化

[数据源]
- sales_data.csv
- customer_data.csv
- product_data.csv

[可用字段]
- sales_date
- sales_amount
- customer_id
- product_id
- region
- category

[图表类型]
- 柱状图
- 折线图
- 饼图
- 散点图
- 仪表盘`,
    scraping: `# 数据采集工具模拟
# 尝试编写爬虫代码

import requests
from bs4 import BeautifulSoup

# 示例：爬取网页标题
def get_page_title(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    return soup.title.string

# 测试函数
url = "https://example.com"
title = get_page_title(url)
print(f"页面标题：{title}")

# 练习：爬取新闻网站的标题列表
def get_news_titles(url):
    # 在这里编写代码
    pass`
  }

  // 切换工具时更新代码
  useEffect(() => {
    setCode(defaultCode[activeTool as keyof typeof defaultCode])
  }, [activeTool])

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold mb-2">学习模块</h1>
        <p className="text-gray-600">边学边练同屏实训，左侧指导书，右侧实训环境</p>
      </div>

      {/* 工具选择 */}
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTool === tool.id
                ? `${tool.color} text-white`
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tool.icon}
            <span>{tool.name}</span>
          </button>
        ))}
      </div>

      {/* 边学边练界面 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧指导书 */}
        <div className="bg-white rounded-lg shadow-md p-6 h-[600px] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">实训指导</h2>
          
          {/* 步骤导航 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tutorialSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  currentStep === step.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                步骤 {step.id}
              </button>
            ))}
          </div>

          {/* 步骤内容 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{tutorialSteps[currentStep - 1].title}</h3>
            <div className="prose max-w-none">
              {tutorialSteps[currentStep - 1].content.split('\n').map((line, index) => (
                <p key={index} className={line.startsWith('```') ? 'bg-gray-100 p-4 rounded-md font-mono text-sm' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* 步骤导航按钮 */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              上一步
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(tutorialSteps.length, currentStep + 1))}
              disabled={currentStep === tutorialSteps.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              下一步
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>

        {/* 右侧实训环境 */}
        <div className="bg-white rounded-lg shadow-md p-6 h-[600px] flex flex-col">
          <h2 className="text-xl font-bold mb-4">实训环境</h2>
          
          {/* 工具标题 */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              {tools.find(t => t.id === activeTool)?.name} 环境
            </h3>
          </div>

          {/* 代码编辑器 */}
          <div className="flex-1 bg-gray-900 rounded-md overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-400 text-sm ml-2">{activeTool === 'python' ? 'script.py' : activeTool === 'sql' ? 'query.sql' : activeTool === 'bi' ? 'dashboard.bi' : 'scraper.py'}</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 h-[450px] bg-gray-900 text-gray-300 font-mono text-sm resize-none"
              placeholder="在此处编写你的代码..."
            ></textarea>
          </div>

          {/* 运行按钮 */}
          <div className="mt-4 flex justify-end">
            <button className="px-6 py-2 bg-[#F97316] hover:bg-orange-600 text-white font-medium rounded-md transition-colors">
              运行代码
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Learning
